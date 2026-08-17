from app import create_app
import yfinance as yf
from dotenv import load_dotenv
from flask import Flask, jsonify, session, redirect, url_for, request
from flask_pymongo import PyMongo, MongoClient
from flask_bcrypt import Bcrypt
import requests
from flask_session import Session
import os
from datetime import datetime, timedelta

load_dotenv()
app = create_app()

FMP_API_KEY     = os.getenv('FMP_API_KEY')
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
MONGODB_URI     = os.getenv('MONGODB_URI')

Client      = MongoClient(MONGODB_URI)
fn_database = Client.finance476_database


@app.route('/health')
def health_check():
    return jsonify({'status': 'ok'})


@app.route('/stock/<symbol>')
def get_stock_data(symbol):
    try:
        stock = yf.Ticker(symbol)
        data = stock.info
        if not data or (data.get('regularMarketPrice') is None and data.get('currentPrice') is None):
            return jsonify({'error': f'No data found for symbol {symbol}'}), 404
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': 'Failed to fetch stock data', 'details': str(e)}), 502


@app.route('/search/<query>', methods=['GET'])
def search_stock(query):
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    url = f'https://finnhub.io/api/v1/search?q={query}&token={FINNHUB_API_KEY}'
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from Finnhub', 'details': str(e)}), 502


@app.route('/top-gainers')
def get_top_gainers():
    url = f'https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={FMP_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch top gainers', 'details': str(e)}), 502


@app.route('/top-losers')
def get_top_losers():
    url = f'https://financialmodelingprep.com/api/v3/stock_market/losers?apikey={FMP_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch top losers', 'details': str(e)}), 502


@app.route('/trending')
def get_trending():
    url = f'https://financialmodelingprep.com/api/v3/stock_market/actives?apikey={FMP_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch trending stocks', 'details': str(e)}), 502


@app.route('/screener', methods=['GET'])
def screener():
    params = {
        'marketCapMoreThan':  request.args.get('marketCapMoreThan'),
        'marketCapLowerThan': request.args.get('marketCapLowerThan'),
        'priceMoreThan':      request.args.get('priceMoreThan'),
        'priceLowerThan':     request.args.get('priceLowerThan'),
        'betaMoreThan':       request.args.get('betaMoreThan'),
        'betaLowerThan':      request.args.get('betaLowerThan'),
        'volumeMoreThan':     request.args.get('volumeMoreThan'),
        'volumeLowerThan':    request.args.get('volumeLowerThan'),
        'dividendMoreThan':   request.args.get('dividendMoreThan'),
        'dividendLowerThan':  request.args.get('dividendLowerThan'),
        'isEtf':              request.args.get('isEtf'),
        'isFund':             request.args.get('isFund'),
        'isActivelyTrading':  request.args.get('isActivelyTrading'),
        'sector':             request.args.get('sector'),
        'industry':           request.args.get('industry'),
        'country':            request.args.get('country'),
        'exchange':           request.args.get('exchange'),
        'limit':              request.args.get('limit', 10),
    }
    params = {k: v for k, v in params.items() if v is not None}
    try:
        response = requests.get(
            'https://financialmodelingprep.com/api/v3/stock-screener',
            params={**params, 'apikey': FMP_API_KEY},
            timeout=10,
        )
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 502


@app.route('/graph/<symbol>')
def get_graph(symbol):
    url = f'https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?apikey={FMP_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch graph data', 'details': str(e)}), 502


@app.route('/stocknews/<symbol>')
def get_stocknews(symbol):
    today     = datetime.now().date()
    from_date = (today - timedelta(days=30)).isoformat()
    url = f'https://finnhub.io/api/v1/company-news?symbol={symbol}&from={from_date}&to={today.isoformat()}&token={FINNHUB_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch stock news', 'details': str(e)}), 502


@app.route('/getcryptolist')
def get_crypto():
    url = f'https://financialmodelingprep.com/api/v3/symbol/available-cryptocurrencies?apikey={FMP_API_KEY}'
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return jsonify(r.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch crypto list', 'details': str(e)}), 502


import manage_users
import user_data
import forum_post
import news

if __name__ == '__main__':
    app.run(debug=False)
