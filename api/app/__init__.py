from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set the FLASK_APP environment variable
os.environ['FLASK_APP'] = 'main.py'

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('secret_key')
    app.config['SESSION_TYPE'] = 'filesystem'
    
    CORS(app)  # Enable CORS if needed

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()