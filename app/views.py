from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests
import json

from django.views.decorators.csrf import csrf_exempt

from app.models import User


def get_vacancies():
    # URL для запроса к API
    url = 'https://api.hh.ru/vacancies'

    # Параметры запроса
    params = {
        'text': 'reksoft',
        'per_page': 20  # Количество вакансий на странице (можно изменять)
    }

    # Выполнение GET-запроса
    response = requests.get(url, params=params)

    # Проверка успешности запроса
    if response.status_code == 200:
        vacancies = response.json()  # Преобразование ответа в JSON
        return vacancies
    else:
        print(f"Error: {response.status_code}")
        return None


def parse_all_vacs():
    context = {}
    vacancies = get_vacancies()
    counter = 0
    for item in vacancies['items']:
        context[f'{str(counter)}'] = {}
        context[f'{str(counter)}']['id'] = str(counter)
        context[f'{str(counter)}']['title'] = str(item['name'])
        try:
            context[f'{str(counter)}']['salary'] = f"{item['salary']['from']}-{item['salary']['from']}"
        except:
            context[f'{str(counter)}']['salary'] = "Договорная"
        context[f'{str(counter)}']['experience'] = str(item['experience']['name'])
        context[f'{str(counter)}']['places'] = str(item['area']['name'])
        context[f'{str(counter)}']['selected'] = False
        # print(item['snippet'])
        context[f'{str(counter)}']['skills'] = str(item['snippet']['requirement'])
        context[f'{str(counter)}']['employmentForms'] = str(item['employment']['name'])

        counter += 1

    return context


def api_get_vacansies(request, vac_id):
    vacancies = parse_all_vacs()

    if int(vac_id) == 9999999:
        return JsonResponse(vacancies)
    else:
        return JsonResponse(vacancies[str(vac_id)])


def api_create_new_profile(request):
    ...


def api_get_profile(request, profile_id):
    context = {}
    user = User.objects.get(id=profile_id)


@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        essentials = data.get('essentials', {})
        name = essentials.get('name')
        surname = essentials.get('surname')
        middle_name = essentials.get('middleName')
        birth_date = essentials.get('birthDate')
        gender = essentials.get('gender')
        citizenship = essentials.get('citizenship')
        region = essentials.get('region')
        mobile = essentials.get('mobile')
        email = essentials.get('email')
        contacts_telegram = essentials.get('contacts', {}).get('TELEGRAM')
        contacts_vk = essentials.get('contacts', {}).get('VK')
        about = essentials.get('about')
        avatar = essentials.get('avatar')

        user = User.objects.create(
            name=name,
            surname=surname,
            middleName=middle_name,
            birthDate=birth_date,
            gender=gender,
            citizenship=citizenship,
            region=region,
            mobile=mobile,
            email=email,
            contacts=f'Telegram: {contacts_telegram}, VK: {contacts_vk}',
            about=about,
            avatar=avatar
        )

        return JsonResponse({'message': 'User created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


async def api_score_resume(request, vac_id, resume_id):
    # with open('./ml/config/config_ml.json', 'r') as f_in:
    #     config = json.load(f_in)

    # review_generator = ReviewGenerator(**config)
    # resume = ...
    # vacancy = ...
    # ans = await review_generator.generate_review(resume=resume, vacancy=vacancy)
    # return {'score': ans[0], 'review_text': ans[1]}

    return {'score': 90, 'review_text': 'Amazing candidate!'}
