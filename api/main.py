from app import create_app
import yfinance as yf
from dotenv import load_dotenv
from flask import Flask, jsonify, session, redirect, url_for, request
from flask_pymongo import PyMongo,MongoClient
from flask_bcrypt import Bcrypt
import requests
import ssl
from flask_session import Session


# os to fetch secret keys stored in .env
import os
load_dotenv()
app = create_app()



#Fetch the api and Mongo keys from .env
ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
FMP_API_KEY = os.getenv('FMP_API_KEY')
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
MONGODB_URI = os.getenv('MONGODB_URI')


#Start the mongo client

Client = MongoClient(
    MONGODB_URI,
    tls=True,
    tlsAllowInvalidCertificates=True
)
#Connect to database
fn_database = Client.finance476_database



@app.route('/stock/<symbol>')
def get_stock_data(symbol):# Fetch a particular stock using yfinance library, shows real-time data
    stock = yf.Ticker(symbol)
    data = stock.info
    return data


@app.route('/search/<query>', methods=['GET'])
def search_stock(query):# Use Finnhib to search for stocks, a little slow but accurate
    
    if not query:#Check if empty query was somehow passes
        return jsonify({'error': 'Query parameter is required'}), 400

    url = f'https://finnhub.io/api/v1/search?q={query}&token={FINNHUB_API_KEY}' #Fetch list
    response = requests.get(url)
    if response.status_code == 200:
        
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch data from Finnhub'}), 500




@app.route('/top-losers')
def get_top_losers():
    url =f'https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={FMP_API_KEY}' # Fetch top losers
    r = requests.get(url)
    data = r.json()
#   No need for error checking since it is done by FMP on their part
    return data
    
    

@app.route('/top-gainers') #Fetch top gainers
def get_top_gainers():
    url =f'https://financialmodelingprep.com/api/v3/stock_market/losers?apikey={FMP_API_KEY}'
    r = requests.get(url)
    data = r.json()
   
    return data
    
@app.route('/trending') #Fetch trending stocks, calculated mostly by volume of trades
def get_trending():
    url =f'https://financialmodelingprep.com/api/v3/stock_market/actives?apikey={FMP_API_KEY}'
    r = requests.get(url)
    data = r.json()
    
    return data

@app.route('/screener', methods=['GET'])
def screener():
    # Extract query parameters all provided by Financial modeling prep
    params = {
        'marketCapMoreThan': request.args.get('marketCapMoreThan'),
        'marketCapLowerThan': request.args.get('marketCapLowerThan'),
        'priceMoreThan': request.args.get('priceMoreThan'),
        'priceLowerThan': request.args.get('priceLowerThan'),
        'betaMoreThan': request.args.get('betaMoreThan'),
        'betaLowerThan': request.args.get('betaLowerThan'),
        'volumeMoreThan': request.args.get('volumeMoreThan'),
        'volumeLowerThan': request.args.get('volumeLowerThan'),
        'dividendMoreThan': request.args.get('dividendMoreThan'),
        'dividendLowerThan': request.args.get('dividendLowerThan'),
        'isEtf': request.args.get('isEtf'),
        'isFund': request.args.get('isFund'),
        'isActivelyTrading': request.args.get('isActivelyTrading'),
        'sector': request.args.get('sector'),
        'industry': request.args.get('industry'),
        'country': request.args.get('country'),
        'exchange': request.args.get('exchange'),
        'limit': request.args.get('limit', 10)  # Default to 10 if not provided
    }
    
    # Remove any parameters that are None
    params = {k: v for k, v in params.items() if v is not None}

    try:
        # Call the FMP screener API
        response = requests.get('https://financialmodelingprep.com/api/v3/stock-screener', params={**params, 'apikey': FMP_API_KEY})
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()

        # Return the data as JSON
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/graph/<symbol>') #Fetch the EOD time series data, data is not day to day so not real time, updated end of every business day
def get_graph(symbol):
    url=f'https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?apikey={FMP_API_KEY}'
    r = requests.get(url)
    data = r.json()
    return data


@app.route('/stocknews/<symbol>') #Fetch stock news
def get_stocknews(symbol):
    url=f'https://finnhub.io/api/v1/company-news?symbol={symbol}&from=2023-08-15&to=2024-07-24&token={FINNHUB_API_KEY}'
    r = requests.get(url)
    data = r.json()
    return data

@app.route('/getcryptolist') #Fetch crypto list
def get_crypto():
    url=f'https://financialmodelingprep.com/api/v3/symbol/available-cryptocurrencies?apikey={FMP_API_KEY}'
    r = requests.get(url)
    data = r.json()
    print(data)
    return data

#Import files
import manage_users 
import user_data
import forum_post
import news


if __name__ == '__main__':
    app.run(debug=False)