import requests
#https://docs.bitfinex.com/reference/rest-public-candles
headers = {
    'Accept': 'application/json',
}

params = {
    'limit': 10,
}

url = "https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist?"
response = requests.get(url, params=params, headers=headers)
json_data = response.json()
for c in json_data:
    print(c)

