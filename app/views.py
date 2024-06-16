from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests
import json
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
