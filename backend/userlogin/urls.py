from django.urls import path, include
from . import views

urlpatterns = [
    path('login_user', views.login_user, name='login_user'),
    path('logout_user', views.logout_user, name='logout_user'),
    path('create/', views.createUser, name='createUser')
]