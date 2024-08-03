import requests
from main import app 
import os


FINNHUB_API_KEY= os.getenv('FINNHUB_API_KEY')


@app.route('/news',methods=['GET'])#Get news
def get_news():
    url = f'https://finnhub.io/api/v1/news?category=general&token={FINNHUB_API_KEY}'
    r = requests.get(url)
    data = r.json()
   
    return data

