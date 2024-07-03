from app import create_app
import yfinance as yf
from dotenv import load_dotenv
from flask import Flask, jsonify, session, redirect, url_for
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import requests
from flask_session import Session

from bs4 import BeautifulSoup
import pandas as pd

import os
load_dotenv()
app = create_app()



Session(app)


ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')




@app.route('/stock/<symbol>')
def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.info
    return data



url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
r = requests.get(url)
data = r.json()


        

@app.route('/top-losers')
def get_top_losers():
    return data

@app.route('/top-gainers')
def get_top_gainers():
    return data
    
import manage_users
import user_messages

if __name__ == '__main__':
    app.run(debug=True)