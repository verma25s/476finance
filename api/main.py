from app import create_app
import yfinance as yf
from dotenv import load_dotenv
from flask import Flask, jsonify, session, redirect, url_for
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import requests
from flask_session import Session



import os
load_dotenv()
app = create_app()



Session(app)


ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')

url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
r = requests.get(url)
data = r.json()




@app.route('/stock/<symbol>')
def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.info
    return data


@app.route('/search/<query>', methods=['GET'])
def search_stock(query):
    
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey={ALPHA_VANTAGE_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch data from Alpha Vantage'}), 500




@app.route('/top-losers')
def get_top_losers():
    return data

@app.route('/top-gainers')
def get_top_gainers():
    return data
    
import manage_users
import user_messages
import forum_post
import news


if __name__ == '__main__':
    app.run(debug=True)