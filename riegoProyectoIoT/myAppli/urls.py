from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Ruta para la página principal
    path('control-riego/', views.control_riego, name='control_riego'),
    path('control-ventilador/', views.control_ventilador, name='control_ventilador'),
    path('get-temperatura/', views.get_temperatura, name='get_temperatura'),
]
