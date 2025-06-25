from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path('<int:day>', views.days_wee_with_number),
    path('<str:day>', views.days_week, name='day-quote')
]
