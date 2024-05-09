
import requests
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ppdproject.settings')
django.setup()

from myapp.models import Currency

headers = {
    'X-CMC_PRO_API_KEY': '25484775cd9d4f83b84d89ca607e23ed',
    'Accept': 'application/json',
}

# Define the list of currency codes to fetch
currency_codes = ['USD', 'EUR', 'GBP', 'PKR', 'DZD', 'INR', 'CAD', 'AUD', 'SGD', 'CHF', 'NZD', 'JPY', 'CNY', 'RUB']

# Fetch latest exchange rates for the specified currencies
url = f'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=25484775cd9d4f83b84d89ca607e23ed&symbols={",".join(currency_codes)}'
response = requests.get(url, headers=headers)
json_data = response.json()

# Mapping of currency codes to their symbols
currency_symbols = {
    'INR': '₹',   # Indian Rupee
    'CAD': 'C$',  # Canadian Dollar
    'AUD': 'A$',  # Australian Dollar
    'SGD': 'S$',  # Singapore Dollar
    'CHF': 'Fr',   # Swiss Franc
    'NZD': 'NZ$',  # New Zealand Dollar
    'JPY': '¥',    # Japanese Yen
    'CNY': '元',   # Chinese Yuan
    'RUB': '₽',   # Russian Ruble
}

rates = json_data['rates']

for code, rate in rates.items():
        currency=Currency.objects.filter(name=code).get()
        currency.price_usd = rate
        currency.save()
