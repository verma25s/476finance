from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('secret_key')
    app.config['SESSION_TYPE'] = 'filesystem'
    return app