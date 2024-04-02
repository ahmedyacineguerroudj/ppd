from django.urls import path
from . import views

urlpatterns =[
    path('', views.sign, name='home'),
    path('buy/', views.buy, name='buy/'),
    path('sign/', views.sign, name='sign'),
    path('signout/', views.signout, name='signout'),
    path('fild1/', views.fild1, name='fild1'),
    path('fild2/', views.fild2, name='fild2'),
    path('fild3/', views.fild3, name='fild3'),
    path('fild4/', views.fild4, name='fild4'),

    path('get_csrf_token/', views.get_csrf_token, name='csrd')
]