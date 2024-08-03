# Import necessary libraries
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
    #Set the app session key
    app.config['SECRET_KEY'] = os.getenv('secret_key')
    #Set the session storage type to filesystem
    app.config['SESSION_TYPE'] = 'filesystem'
    #Enable CORS app
    CORS(app)  # Enable CORS if needed

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()
# enables the debug mode for development 