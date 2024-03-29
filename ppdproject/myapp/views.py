
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required #bah n9olo lazm dir count z3
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
# Create your views here.


def signin(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try :
            user=User.objects.get(email=email)
        except:
                messages.error(request, 'user dont exist')

        user =authenticate(request,email=email,password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else :
            messages.error(request,'email OR Password is incorrecr')

    contect ={}
    return  render(request, 'signin.html')

def signout (request):
    logout(request)
    return redirect('home')

def signup(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user=form.save(commit=False)
            user.username=user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'An errer occured while signing up')

    return render(request,'html', {'form':form})
