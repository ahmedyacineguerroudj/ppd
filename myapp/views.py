
from django.shortcuts import redirect, render
from myapp.models import User,Market,Cryptocurrency,WalletCurrencies,Wallet
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.middleware.csrf import get_token
import uuid
# Create your views here.



def sign(request):

    if request.method == 'POST':
        signin=request.POST.get('login')
        signup=request.POST.get('signup')
        print(signin)
        print(signup)
        if signin is not None :
            if request.method == 'POST':
                  email = request.POST.get('email')
                  password = request.POST['password']
                  print(email)
                  if not User.objects.filter(email=email).exists():
                          messages.error (request,'This email is not registered. Please sign up.')
                  else:
                     try:
                           user = User.objects.filter(email=email, Password=password).get()
                           login(request, user)
                           messages.success(request, 'User authenticated successfully.')
                           return redirect('buy/')
                     except:
                         messages.error(request, 'Email or password is incorrect.')


        if signup is not None:
            if request.method == 'POST':
               email = request.POST.get('email')
               password = request.POST['password']
               first_name = request.POST['first_name']
               last_name = request.POST['last_name']
               confirm_password = request.POST['confirm_password']
               birthdate = request.POST.get('birthdate')
               print(email)

               if User.objects.filter(email=email).exists():
                  messages.error(request, 'This email is already registered. Please use a different email.')
                  return redirect('signup')


               if password != confirm_password:
                  messages.error(request, 'Passwords do not match.')
                  return redirect('signup')

               try:

                  birthdate = timezone.make_aware(datetime.strptime(birthdate, '%Y-%m-%d'))


                  user = User(email=email, First_Name=first_name, Last_Name=last_name, Password=password)
                  user.Birthday = birthdate
                  user.last_login = timezone.now()
                  user.Registration_Date = timezone.now()

                  user.save()
                  us=User.objects.filter(email=email).get()
                  wallet=Wallet()
                  wallet.User_ID=us.User_ID
                  wallet.Balance_Total=0
                  wallet.Updated_At=timezone.now()
                  wallet.save()
                  return redirect('home')

               except Exception as e:
                    messages.error(request, 'An error occurred while signing up.')
                    return redirect('signup')

    return render(request, 'a.html')



def signout (request):
    logout(request)
    return redirect('home')


@login_required()
def buy (request):
    if request.method=='GET':
        buy = request.GET.get('buy')
        sell =request.GET.get('sell')

        if buy is not None:
            if request.method=='GET':
               fild1 = float(request.GET.get('fild1', 0))
               fild2 = float(request.GET.get('fild2', 0))
               select2 = request.GET.get('select2')

               wallet=Wallet.objects.filter(User_ID=request.User.User_ID).get()
               crypto=Cryptocurrency.objects.filter(symbol=select2).get()
               market=Market.objects.filter(CryptocurrencyID=crypto.CryptocurrencyID).get()

               if not WalletCurrencies.objects.filter(CryptocurrencyID=crypto.CryptocurrencyID,WalletID=wallet.WalletID).exists():
                  walletcurrencies=WalletCurrencies()
                  walletcurrencies.Balance=0
                  walletcurrencies.CryptocurrencyID=crypto.CryptocurrencyID
                  walletcurrencies.save()
                  walletcurrencies=WalletCurrencies.objects.filter(CryptocurrencyID=crypto.CryptocurrencyID,WalletID=wallet.WalletID).get()

               if wallet.Balance_Total>=float(fild1*market.Price_USD):
                   walletcurrencies.Balance+=fild2
                   wallet.Balance_Total-=float(fild1*market.Price_USD)
                   wallet.save()
                   walletcurrencies.save()
               else:
                   messages.error(request,'you dont have money')


        if sell is not None:
            if request.method=='GET':
                fild1 = float(request.GET.get('fild1', 0))
                fild2 = float(request.GET.get('fild2', 0))
                select2 = request.GET.get('select2')

                wallet=Wallet.objects.filter(User_ID=request.User.User_ID).get()
                crypto=Cryptocurrency.objects.filter(symbol=select2).get()
                if WalletCurrencies.objects.filter(CryptocurrencyID=crypto.CryptocurrencyID,WalletID=wallet.WalletID).exists():
                    walletcurrencies=WalletCurrencies.objects.filter(CryptocurrencyID=crypto.CryptocurrencyID,WalletID=wallet.WalletID).get()
                    walletcurrencies.Balance+=fild2
                else:
                     walletcurrencies=WalletCurrencies()
                     walletcurrencies.Balance=fild1
                     walletcurrencies.CryptocurrencyID=crypto.CryptocurrencyID

    return render(request,'index.html')





def fild2(request):
    if request.method == 'GET':
        fild1 = float(request.GET.get('fild1', 0))
        select2 = request.GET.get('select2')
        print(fild1)

        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(CryptocurrencyID=cryptoid2.CryptocurrencyID).get()

        totalcrypto2 = fild1 / float(price2.Price_USD)

    return JsonResponse({'totalcrypto2': totalcrypto2})

def fild3(request):
    if request.method == 'GET':
        fild1 = float(request.GET.get('fild3', 0))
        select2 = request.GET.get('select3')
        print(fild1)
        print(select2)
        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(CryptocurrencyID=cryptoid2.CryptocurrencyID).get()

        totalcrypto4 = fild1 * float(price2.Price_USD)
        print(totalcrypto4)

    return JsonResponse({'totalcrypto4': totalcrypto4})


def fild1(request):
    if request.method == 'GET':
        fild2 = float(request.GET.get('fild2', 0))
        select2=request.GET.get('select2')
        print(fild2)

        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(CryptocurrencyID=cryptoid2.CryptocurrencyID).get()

        print(price2.Price_USD)
        totalcrypto1 = fild2 * float(price2.Price_USD)

    return JsonResponse({'totalcrypto1': totalcrypto1})

def fild4(request):
    if request.method == 'GET':
        fild2 = float(request.GET.get('fild4', 0))
        select2=request.GET.get('select3')
        print(fild2)

        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(CryptocurrencyID=cryptoid2.CryptocurrencyID).get()

        print(price2.Price_USD)
        totalcrypto3 = fild2 / float(price2.Price_USD)

    return JsonResponse({'totalcrypto3': totalcrypto3})


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

# Create your views here.m django.shortcuts import render

# Create your views here.
