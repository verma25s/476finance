from main import app
from pymongo import MongoClient,DESCENDING
from flask_pymongo import PyMongo
from flask import Flask, jsonify, session, redirect, url_for, request
from flask_session import Session 
from flask_cors import CORS
from datetime import datetime

Session(app)
Client = MongoClient('localhost',27017)
import manage_users

fn = Client.finance476_database
messages = fn.messages
watchlist = fn.watchlist

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/messages', methods=['GET'])
def get_messages():
    try:
        
        messages = fn.messages.find().sort('timestamp', DESCENDING)
        formatted_messages = [{
            '_id': str(message['_id']),
            'email': message['email'],
            'content': message['content'],
            'timestamp': message['timestamp']
        } for message in messages]
        return jsonify(formatted_messages), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching messages', 'details': str(e)}), 500






@app.route('/add-messages', methods=['POST'])
def add_messages():
    try:
        email = request.json['email']
        content = request.json['content']
        timestamp = request.json['timestamp'] if 'timestamp' in request.json else datetime.now()
        if not email or not content:
            raise KeyError('Email or content is missing')

        new_message = {
            
            'email': email,
            'content': content,
            'timestamp': timestamp
        }

        messages.insert_one(new_message)
        return jsonify({'message': 'Message added successfully'}), 200

    except KeyError as e:
        return jsonify({'error': 'Invalid data provided', 'details': str(e)}), 400

    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the message', 'details': str(e)}), 500



@app.route('/get-watchlist', methods=['GET'])
def get_watchlist():
    try:
        
        watchlist = fn.watchlist.find()
        formatted_messages = [{
            
            'symbol': stock['symbol'],
            'name': stock['name'],
        } for stock in watchlist]
        return jsonify(formatted_messages), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching messages', 'details': str(e)}), 500
    

@app.route('/check-if-in-watchlist', methods=['GET'])
def check_if_in_watchlist():
    symbol = request.args.get('symbol')
    email = request.args.get('email')
    if not symbol or not email:
        return jsonify({"error": "Symbol and email are required"}), 400

    watchlist = fn.watchlist.find_one({"symbol": symbol, "email": email})
    return jsonify({"inWatchlist": watchlist is not None})


@app.route('/add-to-watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    symbol = data.get('symbol')
    email = data.get('email')
    if not symbol or not email:
        return jsonify({"error": "Symbol and email are required"}), 400

    # Check if the symbol is already in the watchlist
    if fn.watchlist.find_one({"symbol": symbol, "email": email}):
        return jsonify({"error": "Symbol is already in the watchlist"}), 400

    fn.watchlist.insert_one({"symbol": symbol, "email": email})
    return jsonify({"message": "Symbol added to watchlist"})

# Endpoint to remove a stock from the watchlist
@app.route('/remove-from-watchlist', methods=['POST'])
def remove_from_watchlist():
    data = request.get_json()
    symbol = data.get('symbol')
    email = data.get('email')
    if not symbol or not email:
        return jsonify({"error": "Symbol and email are required"}), 400

    result = fn.watchlist.delete_one({"symbol": symbol, "email": email})
    if result.deleted_count == 0:
        return jsonify({"error": "Symbol not found in watchlist"}), 404

    return jsonify({"message": "Symbol removed from watchlist"})