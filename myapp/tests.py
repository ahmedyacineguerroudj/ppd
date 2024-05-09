import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ppdproject.settings')
django.setup()
import json
from datetime import datetime
import requests
from myapp.models import VisaCards,User

def sendtradeinfo(request):
    headers = {
        'Accept': 'application/json',
    }

    params = {
        'limit': 100,
    }

    url = "https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist?"
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
                'Qty':c[2],
                'total':c[2],
            }
            trade1list.append(u)
            t=t+1

    print(trade1list)
    print(trade2list)


sendtradeinfo()