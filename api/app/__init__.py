from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)
    secret_key = os.urandom(24)
    app.secret_key = secret_key
    cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
    return app