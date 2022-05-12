from unicodedata import name
from django.urls import path, include

from . import views

urlpatterns = [
    path('events/', views.EventList.as_view(), name="events"),
    path('events/<int:pk>', views.EventDetail.as_view()),
    path('reminder/<int:pk>', views.toggleReminder, name='toggleReminder'),
    path('users/', views.UserList.as_view(), name="users"),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]
