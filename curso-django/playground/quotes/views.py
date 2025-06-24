from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse

days_of_week = {
    'monday': 'Pienso, luego existo',
    'tuesday': 'La vida es un sueño',
    'wednesday': 'El conocimiento es poder',
    'thursday': 'Se el cambio que quieres ver',
    'friday': 'Solo se que nada se',
    'saturday': 'Vive como si fuera el utlimo dia',
    'sunday': 'Da un poquito mas todos los dias'
}

# Create your views here.

def index(request):
    list_items = ''
    days = list(days_of_week.keys())
    for day in days:
        day_path = reverse('day-quote', args=[day])
        list_items += f'<li><a href="{day_path}">{day.upper()}</a></li>'
    response_html = f'<ul>{list_items}</ul>'
    return HttpResponse(response_html)

def days_week(request, day):
    try:
        quote_text = days_of_week[day]
        return HttpResponse(quote_text)
    except KeyError:
        return HttpResponseNotFound('No hay frase.')
    

def days_wee_with_number(request, day):
    days = list(days_of_week.keys())
    if day > len(days):
        return HttpResponseNotFound('<h1>El dia no existe</h1>')
    redirect_day = days[day-1]
    redirect_path = reverse('day-quote', args=[redirect_day])
    return HttpResponseRedirect(redirect_path)