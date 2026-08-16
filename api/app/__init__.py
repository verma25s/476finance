from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
# Set the FLASK_APP environment variable
os.environ['FLASK_APP'] = 'main.py'

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('secret_key')
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_SAMESITE'] = os.getenv('SESSION_COOKIE_SAMESITE', 'Lax')
    app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE', 'False') == 'True'
    frontend_origin = os.getenv('FRONTEND_ORIGIN', 'http://localhost:3000')
    CORS(app, supports_credentials=True, origins=[frontend_origin])
    return app

if __name__ == "__main__":
    
    app = create_app()
    app.run()
    
# enables the debug mode for development 