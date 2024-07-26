import requests
from main import app 
import os


ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')


@app.route('/news',methods=['GET'])
def get_news():
    url = "https://finnhub.io/api/v1/news?category=general&token=cpnrk8pr01qru1ca4n5gcpnrk8pr01qru1ca4n60"
    r = requests.get(url)
    data = r.json()
    print(data)
    return data

