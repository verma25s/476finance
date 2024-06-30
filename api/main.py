from app import create_app
import yfinance as yf
from flask import Flask, jsonify
import requests
from dotenv import load_dotenv
import os
load_dotenv()
app = create_app()

ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')



@app.route('/stock/<symbol>')
def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.info
    return data


@app.route('/top-gainers')
def get_top_gainers():
    url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}}'
    r = requests.get(url)
    if r.status_code == 200:
        data = r.json()
        print(data)
        return data
    else:
        print("error")

if __name__ == '__main__':
    app.run(debug=True)