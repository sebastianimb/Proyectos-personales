from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, Http404
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
    days = list(days_of_week.keys())
    return render(request, 'quotes/quotes.html', {'days': days})

def days_week(request, day):
    try:
        quote_text = days_of_week[day]
        return HttpResponse(quote_text)
    except KeyError:
        #return HttpResponseNotFound('No hay frase.')
        #return render(request, 'includes/404.html')
        raise Http404()
    

def days_wee_with_number(request, day):
    days = list(days_of_week.keys())
    if day > len(days):
        return HttpResponseNotFound('<h1>El dia no existe</h1>')
    redirect_day = days[day-1]
    redirect_path = reverse('day-quote', args=[redirect_day])
    return HttpResponseRedirect(redirect_path)