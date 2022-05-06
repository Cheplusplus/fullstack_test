from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>', views.index, name='index'),
    path('add/<int:id>', views.addEvent, name= 'addEvent'),
    path('delete/<int:id>', views.deleteEvent, name='deleteEvent'),
    path('reminder/<int:id>', views.toggleReminder, name='toggleReminder'),
]