from django.shortcuts import render
from django.http import HttpResponse
from datetime import date

# Create your views here.
def home(request):
    today = date.today()
    stack = [   { 'id': 'python', 'name':'python'},
                { 'id': 'typescript', 'name':'typescript'},
                { 'id': 'react', 'name':'react'},
                { 'id': 'html', 'name':'html'},
                { 'id': 'sass', 'name':'sass'},
            ]
    return render(request, 'landing/landing.html', {
        'name': 'sebastian',
        'age': 28,
        'today': today,
        'stack': stack
    })

def stack_detail(request, tool):
    return HttpResponse(tool)
