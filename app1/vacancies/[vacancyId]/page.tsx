'use client';

import type { VacancyFull } from '@/app/models/vacancy';
import { VacancyTab } from '../components/vacancyTab';
import { EmploymentForm } from '@/app/models/vacancy/employment-form';
import block from 'bem-cn-lite';
import './page.scss';
import { Label } from '@gravity-ui/uikit';
import { ContactForm } from './components/contactForm';

const b = block('vacancy');

const sample: VacancyFull = {
    id: 'RandomIndex',
    title: 'Job title',
    salary: 'от 100к в нс',
    experience: '12 years in Azakaban',
    employmentForms: [EmploymentForm.FullTime, EmploymentForm.Remote],
    selected: Math.floor(Math.random() * 3 - 1) > 0,

    places: ['Moscow, St Petersburg'],
    description:
        'Some long long description.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    expectations: Array.from({ length: 10 }).map(
        (_, id) => `Expectation blah blah blah blah blah blah ${id}`
    ),
    skills: Array.from({ length: 10 }).map((_, id) => `Skill ${id}`),
    offers: Array.from({ length: 10 }).map(
        (_, id) => `Expectation blah blah blah blah blah blah ${id}`
    ),
};

export default function VacancyPage({
    params: { vacancyId },
}: {
    params: { vacancyId: string };
}) {
    return (
        <div className={b()}>
            <VacancyTab {...sample} onSelectedSwitch={() => {}} noLink />
            <div className={b('details')}>
                <div className={b('info', { text: true })}>
                    <p>{sample.description}</p>
                </div>
                <div className={b('info', { list: true })}>
                    <h3 className={b('title')}>Ожидания от кандидата</h3>
                    <ul>
                        {sample.expectations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={b('info', { enum: true })}>
                    <h3 className={b('title')}>Ключевые навыки</h3>
                    <div>
                        {sample.skills.map((skill, index) => (
                            <Label size="m" key={index}>
                                {skill}
                            </Label>
                        ))}
                    </div>
                </div>
                <div className={b('info', { list: true })}>
                    <h3 className={b('title')}>Мы предлагаем</h3>
                    <ul>
                        {sample.offers.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={b('contact-form')}>
                <h3 className={b('title')}>
                    Если остались вопросы, то напишите нам
                </h3>
                <ContactForm onConfirm={console.log} />
            </div>
        </div>
    );
}
