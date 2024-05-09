
import stripe
from django.shortcuts import redirect, render
from myapp.models import User,Market,Cryptocurrency,WalletCurrencies,Wallet,Transactionin,TransactionOut,VisaCards,Currency
import  requests
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import login, logout,authenticate
from django.utils import timezone
from datetime import datetime
from django.db import transaction
import base64
from myapp.validators import LuhnValidator,CVCValidator,ExpiryDateValidator,CardholderNameValidator
from django.core.exceptions import ValidationError
import random
from plotly.subplots import make_subplots
import string
from django.shortcuts import render
from django.http import JsonResponse
import json
import secrets
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password
import os
from plotly import graph_objs as go
# Create your views here.
def test(request):

    return render(request, 'tradepage.html')

def home(request):
    if request.method=='POST':
        json_data = json.loads(request.body)
        inner_data = json_data.get('clicked')
        if inner_data is not None:
            senddata(inner_data)




    return render(request,'homepage.html')


def senddata(data):
    return JsonResponse({'data': data})




def send_confirmation_email(email, first_name, confirmation_code):
    try:

        subject = 'Confirm your email'
        subject = 'Confirmation Code for Your Account'
        message = f'Dear {first_name},\n\n'
        message += 'Thank you for signing up with our service. To complete your registration, please use the following confirmation code:\n\n'
        message += f'Confirmation Code: {confirmation_code}\n\n'
        message += 'Please enter this code in the appropriate field to confirm your email address.\n\n'
        message += 'If you did not register for this service, please ignore this email.\n\n'
        message += 'Best regards,\nYour Application Team'
        send_mail(subject, message, settings.EMAIL_HOST, [email],fail_silently=False)

    except Exception as e:
        print('An error occurred while sending email:', e)


def signout (request):
    logout(request)
    return redirect('/home')



def buyandsell (request):


    if request.method=='POST':
        json_data = json.loads(request.body)
        inner_data = json_data.get('data')
        operation=inner_data.get('operation')





        User=request.user
        if operation =='buy':
                fild1 =float(inner_data.get('field1', 0))
                fild2 =float(inner_data.get('field2', 0))
                select2=inner_data.get('select2')
                select1=inner_data.get('select1')
                print(select2)
                print(select1)


                wallet=Wallet.objects.filter(User=User).get()

                cryptocurrency=Cryptocurrency.objects.filter(symbol=select2).get()
                currency=Currency.objects.filter(name=select1).get()



                if wallet.Balance_Total>= fild1/currency.price_usd:

                    if not WalletCurrencies.objects.filter(Cryptocurrency=cryptocurrency,Wallet=wallet).exists():
                        walletcurrencies=WalletCurrencies()
                        walletcurrencies.Cryptocurrency=cryptocurrency
                        walletcurrencies.Wallet=wallet

                    else:

                        walletcurrencies=WalletCurrencies.objects.filter(Wallet=wallet,Cryptocurrency=cryptocurrency).get()



                    walletcurrencies.Balance+= fild2

                    wallet.Balance_Total-= fild1/currency.price_usd


                    wallet.save()
                    walletcurrencies.save()

                    transaction=Transactionin()
                    transaction.Transaction_Type='buy'
                    transaction.Cryptocurrency=cryptocurrency

                    transaction.User=User

                    transaction.Amount=fild2

                    transaction.save()
                    print('done')


                else:
                    messages.error(request,{})


        if operation =='sell':
                fild3 =float(inner_data.get('field2', 0))
                fild4 =float(inner_data.get('field1', 0))
                select3=inner_data.get('select2')
                select4=inner_data.get('select1')

                wallet=Wallet.objects.filter(User=User).get()
                cryptocurrency=Cryptocurrency.objects.filter(symbol=select3).get()
                currency=Currency.objects.filter(name=select4).get()

                if WalletCurrencies.objects.filter(Cryptocurrency=cryptocurrency,Wallet=wallet).exists():

                    walletcurrencies=WalletCurrencies.objects.filter(Cryptocurrency=cryptocurrency,Wallet=wallet).get()

                    if walletcurrencies.Balance>= fild3:

                        walletcurrencies.Balance-=fild3
                        wallet.Balance_Total += fild4/currency.price_usd

                        wallet.save()
                        walletcurrencies.save()
                        transaction=Transactionin()
                        transaction.Transaction_Type='sell'
                        transaction.Cryptocurrency=cryptocurrency

                        transaction.User=User

                        transaction.Amount=fild3
                        print('done')
                        transaction.save()

                    else:
                        messages.error(request,'you dont have crypto')
                else:
                    messages.error(request,'you dont have this crypto')





    return render(request, 'buy&sell.html', )



def exchange(request):
    if request.method =='POST':

                json_data = json.loads(request.body)
                inner_data = json_data.get('data')
                fild1=float( inner_data.get('feild1'))
                fild2=float(inner_data.get('feild2'))
                select1=inner_data.get('select1')
                select2=inner_data.get('select2')


                user=request.user
                wallet=Wallet.objects.filter(User=user).get()
                crypto1=Cryptocurrency.objects.filter(symbol=select1).get()
                crypto2=Cryptocurrency.objects.filter(symbol=select2).get()


                if not WalletCurrencies.objects.filter(Cryptocurrency=crypto1,Wallet=wallet).exists():

                    return JsonResponse(request,'fuck')

                walletcurrencies=WalletCurrencies.objects.filter(Cryptocurrency=crypto1,Wallet=wallet).get()

                if walletcurrencies.Balance>=fild1:

                    if not WalletCurrencies.objects.filter(Cryptocurrency=crypto2,Wallet=wallet).exists():

                        walletcurrencies2=WalletCurrencies()
                        walletcurrencies2.Cryptocurrency=crypto2
                        walletcurrencies2.Wallet=wallet
                    else:
                        walletcurrencies2=WalletCurrencies.objects.filter(Cryptocurrency=crypto2,Wallet=wallet).get()


                    walletcurrencies.Balance-=fild1
                    walletcurrencies2.Balance+=fild2

                    with transaction.atomic():
                        walletcurrencies.save()
                        walletcurrencies2.save()




    return render(request,'exchange.html')

def deposit(request):
    if request.method == 'POST':
            json_data = json.loads(request.body)
            inner_data = json_data.get('data')
            amount = float(inner_data.get('amount'))
            operation = inner_data.get('operation')
            user=request.user
            if operation == 'Withdraw':
                wallet = Wallet.objects.filter(User=user).get()
                if  wallet.Balance_Total >= amount:
                    wallet.Balance_Total -= amount
                    wallet.save()
                    transaction=TransactionOut()
                    transaction.User=user

                    transaction.Transaction_Type='Withdraw'
                    transaction.Transaction_Date=timezone.now()
                    transaction.Amount=amount
                    transaction.Currency=Currency.objects.filter(name='USD').get()
                    transaction.save()
                    return JsonResponse({'a': 'Withdrawal successful'})
                else:
                   return JsonResponse({'a': 'Insufficient balance'})

            elif operation == 'Deposit':
                wallet = Wallet.objects.filter(User=user).get()
                wallet.Balance_Total += amount
                wallet.save()
                transaction=TransactionOut()
                transaction.User=user
                transaction.Transaction_Type='Deposit'
                transaction.Transaction_Date=timezone.now()
                transaction.Amount=amount
                transaction.Currency=Currency.objects.filter(name='USD').get()
                transaction.save()

                return JsonResponse({'a': 'ahmed'})


    return render(request, 'depost.html')



def validthecard(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)
        inner_data = json_data.get('data')
        firstName = inner_data.get('firstName')
        lastName = inner_data.get('lastName')
        cardNumber = inner_data.get('cardNumber')
        expiryDate = inner_data.get('expiryDate')

        cvv = inner_data.get('cvv')
        Country = inner_data.get('Country')
        city = inner_data.get('city')
        Address = inner_data.get('Address')
        checkbox = inner_data.get('checkbox')
        postalCode = inner_data.get('code_postal')

        if VisaCards.objects.filter(card_number=cardNumber).exists():
            return JsonResponse('exist')

        try:
            luhn_validator = LuhnValidator()
            luhn_validator(cardNumber)

            cvc_validator = CVCValidator()
            cvc_validator(cvv)

            expiry_date_validator = ExpiryDateValidator()

            expiry_date_validator(expiryDate)

            cardholder_name_validator = CardholderNameValidator()
            cardholder_name_validator(firstName + ' ' + lastName)

            if checkbox is not None:
                card=VisaCards()
                card.card_number=cardNumber
                card.city=city
                card.Address=Address
                card.cardholder_name=lastName+' '+firstName

                card.Code_Postal=postalCode
                card.Country=Country
                card.cvv=cvv
                expiry_date = datetime.strptime(expiryDate + '-30', '%Y-%m-%d')
                card.expiration_date=expiry_date
                card.save()
        except ValidationError as e:
            print('not valid',e)




def Marketpage(request):

    return render(request,'Market.html')

def sendmarket(request):

    market=Market.objects.order_by('rank')
    market_list = []
    for m in market:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        crypto = {
            'name': m.Cryptocurrency.name,
            'price': m.Price_USD,
            'marketCap': m.Market_Cap,
            'circulatingSupply': m.Circulating_Supply,
            'change1h': m.changes_in_1h,
            'change24h': m.changes_in_1d,
            'change7d':m.changes_in_7d,
            'Volume24h':m.Volume_24hr,
            'rank':m.rank,
            'image':data_uri,
            'downorup':m.downorupPrice,
        }
        market_list.append(crypto)

    return JsonResponse({'listmarket':market_list})


def settings(request):
    user=request.user
    user=User.objects.filter(User_ID=19).get()
    if request.method=='POST':
        json_data = json.loads(request.body)

        edit=json_data.get('edit')
        print(edit)
        if edit =='firstname':
            firstname=json_data.get('firstname')
            user.First_Name=firstname
            user.save()
        if edit =='lastname':
            lastname=json_data.get('lastname')
            print(lastname)
            user.Last_Name=lastname
            user.save()
        if edit =='email':
            email=json_data.get('email')
            user.Email=email
            user.save()
        if edit =='oldpassword':
            oldpassword=json_data.get('oldpassword')
            if  user.check_password(oldpassword):
                confirmation_code = secrets.token_urlsafe(8)
                request.session['confirmation_code'] = 1111
                send_confirmation_email(user.email, user.First_Name, confirmation_code)
                return  JsonResponse({'message':True})
            else:

                return  JsonResponse({'message':False})

        if edit =='confirmation':
            code=float(json_data.get('code'))

            confirmation_code = request.session.get('confirmation_code')

            if confirmation_code and confirmation_code == code:
                del request.session['confirmation_code']
                return  JsonResponse({'message':True})
            else:
                return  JsonResponse({'message':False})

        if edit =='changepassword':
            newpasssword=json_data.get('newpassword')
            hashed_password = make_password(newpasssword)
            user.password=hashed_password
            user.save()
        if edit =='DisableAccount':

            user.DisableAccount=True
            user.save()
            return redirect('buyandsell')
        if edit =='changeimage':
             image_data_base64=json_data.get('image')

             _, encoded_data = image_data_base64.split(",", 1)
             image_data = base64.b64decode(encoded_data)


             image_name = f'{user.User_ID}.png'
             image_path = os.path.join('D:/python/ppdproject/Userimages/', image_name)
             if os.path.exists(image_path):
               os.remove(image_path)


             with open(image_path, 'wb') as f:
               f.write(image_data)

             user.imageURL = f'D:\\python\\ppdproject\\Userimages\\{image_name}'
             user.save()
             print(user.imageURL)

        if edit =='deletcard':
            numbercard=json_data.get('numbercard')
            VisaCards.objects.filter(card_number=numbercard).get().delete()
            user.save()



    return render(request,'settings.html')



def sendallvisacard(request):
    allcards = VisaCards.objects.filter(User_ID__User_ID=19)
    cisacardlist = []
    for ca in  (allcards):

        card = {
            'title':'visa card',
            'number': ca.card_number,

        }
        cisacardlist.append(card)

    return JsonResponse({'visacads': cisacardlist})



def fild1(request):

    if request.method == 'POST':
      try:
        json_data = json.loads(request.body)
        inner_data = json_data.get('data')
        fild2 = float(inner_data.get('field2'))
        select2 = inner_data.get('select2')
        select1 = inner_data.get('select1')




        if Currency.objects.filter(name=select1).exists():
              price1= 1/Currency.objects.filter(name=select1).get().price_usd
              print(price1)
        else:
            cryptoid1=Cryptocurrency.objects.filter(symbol=select1).get()
            price1=Market.objects.filter(Cryptocurrency=cryptoid1).get().Price_USD

        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(Cryptocurrency=cryptoid2).get().Price_USD


        totalcrypto1 = fild2*float(price2)/float(price1)
        print(totalcrypto1)

      except:
          return JsonResponse({'totalcrypto1': 0})


    return JsonResponse({'totalcrypto1': totalcrypto1})

def fild2(request):

    if request.method == 'POST':
     try:
        json_data = json.loads(request.body)

        inner_data = json_data.get('data')

        fild1 = float(inner_data.get('field1'))
        select2 = inner_data.get('select2')
        select1 = inner_data.get('select1')




        if Currency.objects.filter(name=select1).exists():
            price1= 1/Currency.objects.filter(name=select1).get().price_usd
        else:
            cryptoid1=Cryptocurrency.objects.filter(symbol=select1).get()
            price1=Market.objects.filter(Cryptocurrency=cryptoid1).get().Price_USD
        cryptoid2=Cryptocurrency.objects.filter(symbol=select2).get()
        price2=Market.objects.filter(Cryptocurrency=cryptoid2).get().Price_USD
        totalcrypto2 = float(fild1) * float(price1) / float(price2)
     except:
         return JsonResponse({'totalcrypto2': 0})




    return JsonResponse({'totalcrypto2': totalcrypto2})


def sendhotcrypto(request):
    top_6 = Market.objects.order_by('rank')[:8]
    hotcryotolist = []
    for market in top_6:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        crypto = {
            'name': market.Cryptocurrency.symbol,
            'price': '{:.5f}'.format(market.Price_USD),
            'percentage': '{:.2f}'.format(market.changes_in_1d),
            'image': data_uri,
        }
        hotcryotolist.append(crypto)
    return JsonResponse({'hotcryotolist': hotcryotolist})


def sendtopvaluecrypto(request):
    top = Market.objects.order_by('-Price_USD')[:8]
    topvaluecryotolist = []
    for market in  (top):

        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        crypto = {
            'name': market.Cryptocurrency.symbol,
            'price': '{:.5f}'.format(market.Price_USD),
            'percentage': '{:.2f}'.format(market.changes_in_1d),
            'image': data_uri,
        }
        topvaluecryotolist.append(crypto)
    return JsonResponse({'topvaluecryotolist': topvaluecryotolist})

def sendnewlistedcrypto(request):
    top = Cryptocurrency.objects.order_by('launch_date')[:8]
    newlistedlist = []
    for crypto in top:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        market=Market.objects.filter(Cryptocurrency=crypto).get()
        crypto = {
            'name': market.Cryptocurrency.symbol,
            'price': '{:.5f}'.format(market.Price_USD),
            'percentage': '{:.2f}'.format(market.changes_in_1d),
            'image': data_uri,
        }
        newlistedlist.append(crypto)
    return JsonResponse({'newlisted': newlistedlist})

def sendtopgainercrypto(request):
    top = Market.objects.order_by('changes_in_1d')[:8]
    topgainerlist = []
    for market in top:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        crypto = {
            'name': market.Cryptocurrency.symbol,
            'price': '{:.5f}'.format(market.Price_USD),
            'percentage': '{:.2f}'.format(market.changes_in_1d),
            'image': data_uri,
        }
        topgainerlist.append(crypto)
    return JsonResponse({'topgainerlist': topgainerlist})

def sendcurrecny(request):

    top_6_random = Currency.objects.order_by('?')[:6]
    currencylist = []
    for curr in top_6_random:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"

        currency = {
            'name': curr.name,
            'price': '{:.2f}'.format(curr.price_usd),
            'percentage': '6',  #
            'image': data_uri,
            'image2': data_uri,
        }
        currencylist.append(currency)

    return JsonResponse({'currencylist': currencylist})






def sendallcurroncy(request):
    all = Currency.objects.all()
    currencylist = []
    for curr in all:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
         encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"

        currency = {
         'name': curr.name,
         'photo': data_uri,
        }
        currencylist.append(currency)

    return JsonResponse({'currencylist': currencylist})






def sendallcrypto(request):
    listofcrypto=Cryptocurrency.objects.all()
    allcrypto_list = []
    for crypto in listofcrypto:
        with open("D:\\python\\ppdproject\\images\\BTC.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/png;base64,{encoded_string}"
        cryp = {
            'name': crypto.symbol,
            'photo': data_uri,

        }
        allcrypto_list.append(cryp)

    return JsonResponse({'allcrypto':allcrypto_list})





def walletpage(request):

    if request.method=='POST':
        user=request.user
        print('aa')
        json_data = json.loads(request.body)
        inner = json_data.get('data')
        field1 = inner.get('field1')
        field2 = float(inner.get('field2'))
        select = inner.get('select')

        cryptocurrency=Cryptocurrency.objects.get(symbol=select)
        walletsender=Wallet.objects.get(User=user)

        walletCurrenciessender=WalletCurrencies.objects.get(Wallet=walletsender,Cryptocurrency=cryptocurrency)

        if walletCurrenciessender.Balance<field2:
            return JsonResponse({'message':'you dont have enef menny'})

        if not Wallet.objects.filter(WalletID=field1).exists():
            return JsonResponse({'message':'wallet not found'})

        walletCurrenciessender.Balance-=field2
        walletreciver=Wallet.objects.get(WalletID=field1)
        if not WalletCurrencies.objects.filter(Wallet=walletreciver,Cryptocurrency=cryptocurrency).exists():
            walletCurrenciesreciver=WalletCurrencies()
            walletCurrenciesreciver.Wallet=walletreciver
            walletCurrenciesreciver.Cryptocurrency=cryptocurrency
        else:
            walletCurrenciesreciver=WalletCurrencies.objects.get(Wallet=walletreciver,Cryptocurrency=cryptocurrency)

        walletCurrenciesreciver.Balance+=field2
        walletCurrenciesreciver.save()
        walletCurrenciessender.save()


    return render(request,'wallet.html')

def sendtransction(request):

    if request.method=='POST':
       json_data = json.loads(request.body)
       send = json_data.get('data')



       if send=='all':
           recent_transactions_list=intransctuins(request)+outtransctuins(request)
           recent_transactions_list = sorted(recent_transactions_list, key=lambda x: x['date'], reverse=True)
       elif send =='intransctuins':
           pass
       else:
           recent_transactions_list=outtransctuins(request)


    print(recent_transactions_list)
    return JsonResponse({'transactions': recent_transactions_list})


def intransctuins(request):
    user=request.user
    user_transactions = Transactionin.objects.filter(User=user).order_by('-Transaction_Date')
    recent_transactions_list = []
    for transaction in user_transactions:
        formatted_dt = transaction.Transaction_Date.strftime('%Y-%m-%d %H:%M:%S')
        recent_transaction = {
            'date': formatted_dt,
            'type': transaction.Transaction_Type,
            'amount': transaction.Amount,
            'currency': transaction.Cryptocurrency.symbol,
        }
        recent_transactions_list.append(recent_transaction)

    return recent_transactions_list

def outtransctuins(request):
    user=request.user
    user_transactions = TransactionOut.objects.filter(User=user).order_by('-Transaction_Date')
    recent_transactions_list = []
    for transaction in user_transactions:
        formatted_dt = transaction.Transaction_Date.strftime('%Y-%m-%d %H:%M:%S')
        recent_transaction = {
            'date': formatted_dt,
            'type': transaction.Transaction_Type,
            'amount': transaction.Amount,
            'currency': transaction.Currency.name,
        }
        recent_transactions_list.append(recent_transaction)

    return recent_transactions_list

def sendassets(request):
    user=request.user
    wallet = Wallet.objects.get(User=user)
    assets = WalletCurrencies.objects.filter(Wallet=wallet)
    assetslist = []
    for a in assets:
        price=Market.objects.filter(Cryptocurrency=a.Cryptocurrency).get().Price_USD
        aasset = {
            'coin': a.Cryptocurrency.symbol,
            'amount':a.Balance,
            'price': a.Balance*price,
            'image': "",
        }
        assetslist.append(aasset)
    return JsonResponse({'assets': assetslist})


def senduserinfo(request):
    user = request.user
    us = {
        'id': user.User_ID,
        'firstName':user.First_Name,
        'lastName': user.Last_Name,
        'email': user.email,
        'dob': user.Birthday,
        'image': "",
    }
    return JsonResponse({'user':us})











def adminpage(request):
    if request.method=='POST':
        json_data = json.loads(request.body)
        inner_data = json_data.get('data')
        action = inner_data.get('action')


        if action=='Block':
            print(1)
            id = inner_data.get('id')
            user=User.objects.filter(User_ID=id).get()
            user.Baned=True
            user.save()
        if action=='unblock':
            print(1)
            id = inner_data.get('id')
            user=User.objects.filter(User_ID=id).get()
            user.Baned=False
            user.save()


    return render(request,'adminpage.html')



def sendalluser(request):
    users =User.objects.all()
    userslist = []
    for user in users:
        wallet=Wallet.objects.filter(User_id=user).get()
        u = {
            'id': user.User_ID,
            'lastName':user.Last_Name,
            'firstName': user.First_Name,
            'email': user.email,
            'registered': user.is_active,
            'dateOfBirth': user.Birthday,
            'baned':user.Baned,
            'WalletID':wallet.WalletID,
            'balance':wallet.Balance_Total,

        }
        userslist.append(u)
    print(userslist)
    return JsonResponse({'users': userslist})







def trade(request):

    return render(request,'hi.html')

def hhhhh(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        inner_data = json_data.get('data')
        if inner_data is not None:
          action = inner_data.get('operation')
          time = inner_data.get('time')
          print(time)
          headers = {
            'Accept': 'application/json',
          }
          params = {
            'limit': time,
          }
          url = f"https://api-pub.bitfinex.com/v2/candles/trade:{action}:tBTCUSD/hist"
          response = requests.get(url, params=params, headers=headers)
          json_data = response.json()
          json_data = changetheform(json_data)
          print(json_data)
          return JsonResponse({'data': json_data})


def changetheform(data):
    formatted_data = []
    for item in data:
        timestamp = datetime.fromtimestamp(item[0] / 1000).strftime('%Y-%m-%d %H:%M:%S')
        formatted_item = ','.join([timestamp] + [str(x) for x in item[1:]])
        formatted_data.append(formatted_item)
    return '\n'.join(formatted_data)


def sign(request):

    if request.method == 'POST':
        print(request.body)
        json_data = eval(request.body)
        print(json_data)
        inner_data = json_data.get('data')
        operation=inner_data.get('operation')

        if operation =='signin':

            email = inner_data.get('login_email')
            password = inner_data.get('login_password')

            if not User.objects.filter(email=email).exists():
                return JsonResponse({'massege':"Email or password is incorrect."})
            else:
                try:

                    user = authenticate(request, email=email, password=password)
                    if user.Baned==True:
                        return JsonResponse({'message':'this user is Baned'})
                    if user.DisableAccount==True:
                        return JsonResponse({'massege':'this user is Disable to get it back '})
                    user.is_active=True
                    user.save()
                    login(request, user)
                    print("Successfully logged in")

                    return redirect("/home",)
                except:
                    return JsonResponse({'massege':"Email or password is incorrect."})


        if operation =='signup':
            email = inner_data.get('signup_email')
            password = inner_data.get('signup_password')
            first_name = inner_data.get('signup_first_name')
            last_name = inner_data.get('signup_last_name')
            birthdate = inner_data.get('signup_birthdate')


            if User.objects.filter(email=email).exists():
                return JsonResponse({'massege':'This email is already registered. Please use a different email.'})


            try:
                birthdate = timezone.make_aware(datetime.strptime(birthdate, '%Y-%m-%d'))
                confirmation_code = secrets.token_urlsafe(8)
                send_confirmation_email(email, first_name, confirmation_code)
                hashed_password = make_password(password)
                user = User(email=email, First_Name=first_name, Last_Name=last_name, password=hashed_password)
                user.Birthday = birthdate
                user.last_login = timezone.now()
                user.Registration_Date = timezone.now()
                user.is_active=True
                login(request, user)
                user.save()
                wallet=Wallet()
                wallet.User=User.objects.filter().get(email=email)
                wallet.Updated_At=timezone.now()
                wallet.save()
                return redirect('home')

            except Exception as e:
                return JsonResponse({'massege':'Errer.'})


    return render(request, 'sign.html',)




def islogin(request):
    if request.user.is_authenticated:

        return JsonResponse({'islogin': 1})
    else:
        return JsonResponse({'islogin': 2})



def sendtradeinfo(request):
    headers = {
        'Accept': 'application/json',
    }

    params = {
    'limit': 100,
    }

    url = "https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist?sort=-1"
    response = requests.get(url, params=params, headers=headers)
    json_data = response.json()
    trade1list = []
    trade2list = []
    i=1
    t=1
    for c in json_data:

        if(float(c[2])>=0 and i<=7 ):
            u = {
                'price': c[3],
                'Qty':c[2],
                'total':c[2],
            }
            trade2list.append(u)
            i=i+1
        if (float(c[2])<0 and t<=7 ):
            u = {
                'price': c[3],
                'Qty':-1*c[2],
                'total':-1*c[2],
            }
            trade1list.append(u)
            t=t+1

    return JsonResponse({'tradeinfored': trade1list,'tradeinfogreen': trade2list})




