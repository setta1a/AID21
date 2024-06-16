import json
import os
import typing as tp
from catboost import CatBoostClassifier
from langchain_openai import ChatOpenAI
from langchain_core.messages.human import HumanMessage
from dotenv import dotenv_values
from tika import tika, parser


class ReviewGenerator:
    def __init__(self, **cfg):
        self.VITAL_KEYS_CFG = ('model', 'base_url', 'temperature', 'prompt_path', 'vacancy_prompt_path',
                               'job_template_path', 'education_template_path', 'first_stage_model_path')
        for key in self.VITAL_KEYS_CFG:
            if key not in cfg:
                raise NotImplementedError

        self.environ = dotenv_values(f'{os.getcwd()}/config/environ_vars.env')

        self.VITAL_KEYS_ENV = ('TOKEN', 'TIKA_PATH')
        for key in self.VITAL_KEYS_ENV:
            if key not in self.environ:
                raise NotImplementedError
        
        tika.TikaJarPath = self.environ['TIKA_PATH']

        self.first_stage_model = CatBoostClassifier()
        self.first_stage_model.load_model(cfg['first_stage_model_path'])
        
        self.model = ChatOpenAI(
            api_key=self.environ['TOKEN'],
            model=cfg['model'],
            base_url=cfg['base_url'],
            temperature=cfg['temperature']
        )

        with open(cfg['prompt_path'], 'r') as f_in:
            self.basic_prompt = json.load(f_in)

        with open(cfg['vacancy_prompt_path'], 'r') as f_in:
            self.vacancy_prompt = json.load(f_in)

        with open(cfg['job_template_path'], 'r') as f_in:
            self.job_template = json.load(f_in)
        
        with open(cfg['education_template_path'], 'r') as f_in:
            self.education_template = json.load(f_in)

        if 'resume_token' in cfg:
            self.resume_token = cfg['resume_token']
        else:
            self.resume_token = '[RESUME_FULL_DESCRIPTION]'

        if 'vacancy_token' in cfg:
            self.vacancy_token = cfg['vacancy_token']
        else:
            self.vacancy_token = '[VACANCY_FULL_DESCRIPTION]'

        if 'strip_tokens' in cfg:
            self.STRIP_TOKENS = cfg['strip_tokens']
        else:
            self.STRIP_TOKENS = ('#', '-', '*', '1.')

        if 'first_stage_thr' in cfg:
            self.first_stage_thr = cfg['first_stage_thr']
        else:
            self.first_stage_thr = 0.0

        if 'first_stage_exit_output' in cfg:
            self.first_stage_exit_output = cfg['first_stage_exit_output']
        else:
            self.first_stage_exit_output = 'Кандидат не прошёл первую стадию скоринга'

    
    async def get_resume_as_text(self, resume: tp.Union[dict, str]) -> str:
        if isinstance(resume, dict):
            return await self.get_resume_as_text_from_dict(resume)
        elif isinstance(resume, str):
            return await self.get_resume_as_text_from_file(resume)
        else:
            raise NotImplementedError

    async def get_resume_as_text_from_file(self, resume: str) -> str:
        text = parser.from_file(resume)['content']
        if text:
            return text.strip()
        return None
        
    async def get_resume_as_text_from_dict(self, resume: dict) -> str:
        jobs = []
        for job in resume['experience']:
            job_str = self.job_template
            job_str = job_str.replace('[JOB_COMPANY_NAME]', job['company_name'])
            job_str = job_str.replace('[JOB_POSITION]', job['position'])
            job_str = job_str.replace('[JOB_START_MONTH]', str(job['start_month']))
            job_str = job_str.replace('[JOB_START_YEAR]', str(job['start_year']))
            job_str = job_str.replace('[JOB_DESCRIPTION]', job['description'])
    
            if job['end_month'] is not None and job['end_year'] is not None:
                job_str = job_str.replace('[JOB_END_MONTH]', str(job['end_month']))
                job_str = job_str.replace('[JOB_END_YEAR]', str(job['end_year']))
            else:
                job_str = job_str.replace('[JOB_END_MONTH] [JOB_END_YEAR]', 'Настоящее время')
            
            jobs.append(job_str.strip())
    
        jobs_as_text = '\n\n'.join(jobs).strip()
        jobs_res = f'Опыт работы:\n\n{jobs_as_text}'
    
        educations = []
        for edu in resume['education']:
            edu_str = self.education_template
            edu_str = edu_str.replace('[EDUCATION_DEGREE]', edu['degree'])
            edu_str = edu_str.replace('[EDUCATION_GRADUATE_YEAR]', str(edu['graduate_year']))
            edu_str = edu_str.replace('[EDUCATION_SPECIALIZATION]', edu['specialization'])
            edu_str = edu_str.replace('[EDUCATION_UNIVERSITY]', edu['university'])
            edu_str = edu_str.replace('[EDUCATION_DEPARTMENT]', edu['department'])
    
            educations.append(edu_str)
    
        educations_as_text = '\n\n'.join(educations).strip()
        educations_res = f'Образование:\n\n{educations_as_text}'
    
        skills_res = f'''Заявлено владение навыками {', '.join(skill for skill in resume['skills'])}'''
        
        resume_as_text = f'''{jobs_res}\n\n\n{educations_res}\n\n\n{skills_res}'''.strip()
        
        return resume_as_text.strip()
    
    
    async def get_vacancy_as_text_from_dict(self, vacancy: dict, placeholder_if_empty: str = 'Не указано') -> str:
        if vacancy['professional_roles'][0]['name'] and vacancy['professional_roles'][0]['name'] != 'Другое':
            prof_role = vacancy['professional_roles'][0]['name'] + ', '
        else:
            prof_role = ''

        vacancy_text = self.vacancy_prompt.replace('[PROFFESIONAL_ROLES_0_NAME]', prof_role)
        vacancy_text = vacancy_text.replace('[NAME]', vacancy['name'] or placeholder_if_empty)
        vacancy_text = vacancy_text.replace('[EXPERIENCE_NAME]', vacancy['experience']['name'] or placeholder_if_empty)
        vacancy_text = vacancy_text.replace('[SNIPPET_RESPONSIBILITY]', vacancy['snippet']['responsibility'] or placeholder_if_empty)
        vacancy_text = vacancy_text.replace('[SNIPPET_REQUIREMENT]', vacancy['snippet']['requirement'] or placeholder_if_empty)
        return vacancy_text


    async def get_first_stage_score(self, resume: str, vacancy: str) -> float:
        model_output = self.first_stage_model.predict_proba([resume, vacancy])
        first_stage_score = model_output[1]
        return first_stage_score
        
    
    async def modify_prompt(self, resume: str, vacancy: str) -> str:
        prompt = self.basic_prompt.replace(self.vacancy_token, vacancy)
        prompt = prompt.replace(self.resume_token, resume)
        return prompt


    async def process_model_output(self, outp: str) -> str:
        model_output = outp.content
        model_output = model_output.strip()
        
        for token in self.STRIP_TOKENS:
            model_output = model_output.strip(token)
            model_output = model_output.strip()
            
        return model_output
    
    async def extract_score(self, review_text: str, min_score: int = 0, max_score: int = 100) -> int:
        try:
            for token in self.STRIP_TOKENS:
                review_text = review_text.strip(token)
                review_text = review_text.strip()
            score = review_text.split(maxsplit=2)[1]
            score = score.strip()
            score = int(score)
            score = max(min_score, score)
            score = min(score, max_score)
        except ValueError:
            score = -1

        if score == -1:
            try:
                for token in self.STRIP_TOKENS:
                    review_text = review_text.strip(token)
                    review_text = review_text.strip()
                score = review_text.split('Релевантность: ', maxsplit=2)[1].split()[0]
                score = score.strip()
                score = int(score)
                score = max(min_score, score)
                score = min(score, max_score)
            except ValueError:
                score = -1
        
        return score
    
    
    async def generate_review(self, resume: tp.Union[dict, str], vacancy: dict) -> tuple[int, str]:
        resume_text = await self.get_resume_as_text(resume=resume)
        vacancy_text = await self.get_vacancy_as_text_from_dict(vacancy=vacancy)
        
        first_stage_score = await self.get_first_stage_score(resume=resume_text, vacancy=vacancy_text)
        if first_stage_score < self.first_stage_thr:
            return -1, self.first_stage_exit_output
            
        prompt = await self.modify_prompt(resume=resume_text, vacancy=vacancy_text)
    
        model_input = [HumanMessage(content=prompt)]
        model_output = await self.model.ainvoke(model_input)
        model_output = await self.process_model_output(model_output)
    
        score = await self.extract_score(review_text=model_output)
    
        return score, model_output
