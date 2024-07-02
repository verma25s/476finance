from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
    return app