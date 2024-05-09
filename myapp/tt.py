import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ppdproject.settings')
django.setup()
import requests
from myapp.models import Market, Cryptocurrency,Currency
from django.utils import timezone
import schedule
import logging
import time


def fetch_coin_data():
    headers = {
        'X-CMC_PRO_API_KEY': '7371bf10-3848-4e16-845b-060391cebe59',
        'Accepts': 'application/json',
    }

    params = {
        'convert': 'USD',
        'limit': 1000,
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    response = requests.get(url, params=params, headers=headers)
    json_data = response.json()


    coin_data = json_data.get('data', [])

    for coin_info in coin_data:
        try:
            crypto = Cryptocurrency.objects.filter(name=coin_info['name']).get()
            if crypto:
                market = Market.objects.filter(Cryptocurrency=crypto).get()
                if market.Price_USD> coin_info['quote']['USD']['price']:
                    market.downorupPrice=-1
                elif market.Price_USD < coin_info['quote']['USD']['price']:
                    market.downorupPrice=1
                else :
                    market.downorupPrice=0


                market.changenow = ((coin_info['quote']['USD']['price'] - market.Price_USD) / market.Price_USD) * 100
                market.Price_USD = coin_info['quote']['USD']['price']
                market.Market_Cap = coin_info['quote']['USD']['market_cap']
                market.Volume_24hr = coin_info['quote']['USD']['volume_24h']
                market.Change_24hr = coin_info['quote']['USD']['volume_change_24h']
                market.changes_in_1h = coin_info['quote']['USD'].get('percent_change_1h')
                market.changes_in_1d = coin_info['quote']['USD'].get('percent_change_24h')
                market.changes_in_7d = coin_info['quote']['USD'].get('percent_change_7d')


                market.rank=coin_info['cmc_rank']
                market.Last_Updated = timezone.now()
                market.save()
        except Exception as e:
            pass

    print("Data fetch process completed.")



def fetch_coin_data2():
    headers = {
        "api_key": '3bb49df6-a4df-4991-be3f-fef14c11b004',
        'Accepts': 'application/json',
    }

    params = {
        'convert': 'USD',
        'limit': 2000,
    }

    url= 'https://api.coincap.io/v2/assets'
    response = requests.get(url, params=params, headers=headers)
    json_data = response.json()

    json_data=json_data['data']
    for coin_info in json_data:
        try:
            crypto = Cryptocurrency.objects.filter(name=coin_info['name']).get()
            if crypto:

                market = Market.objects.filter(Cryptocurrency=crypto).get()
                if market.Price_USD> float(coin_info['priceUsd']):
                    market.downorupPrice=-1
                elif market.Price_USD < float(coin_info['priceUsd']):
                    market.downorupPrice=1
                else :
                    market.downorupPrice=0
                market.Price_USD = float(coin_info['priceUsd'])
                market.Last_Updated = timezone.now()

                market.save()

        except Exception as e:
            pass

    print("Data fetch process completed2")

def fetch_currency_price():
    headers = {
        'X-CMC_PRO_API_KEY': '25484775cd9d4f83b84d89ca607e23ed',
        'Accept': 'application/json',
    }

    # Define the list of currency codes to fetch
    currency_codes = ['EUR', 'GBP', 'PKR', 'DZD', 'INR', 'CAD', 'AUD', 'SGD', 'CHF', 'NZD', 'JPY', 'CNY', 'RUB']

    # Fetch latest exchange rates for the specified currencies
    url = f'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=25484775cd9d4f83b84d89ca607e23ed&symbols={",".join(currency_codes)}'
    response = requests.get(url, headers=headers)
    json_data = response.json()

    rates = json_data['rates']

    for code, rate in rates.items():
        currency = Currency.objects.filter(name=code).get()
        currency.price_usd = rate
        currency.save()


def background_task():
    schedule.every(61).seconds.do(fetch_coin_data)
    schedule.every(20).seconds.do(fetch_coin_data2)
    #schedule.every(20).seconds.do(fetch_currency_price)


    while True:

        schedule.run_pending()
        time.sleep(1)

