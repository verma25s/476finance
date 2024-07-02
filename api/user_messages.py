from main import app
from pymongo import MongoClient
from flask import Flask, jsonify, session, redirect, url_for, request
Client = MongoClient('localhost',27017)
fn_database = Client.finance476_database
users = fn_database.users
from flask_cors import CORS
CORS(app)
cors = CORS(app,supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

