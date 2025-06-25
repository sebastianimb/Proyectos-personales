from django.urls import path
from . import views

urlpatterns = [
    path('home', views.home, name='home'),
    path('stack/<str:tool>', views.stack_detail, name='stack')
]
