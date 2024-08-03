from main import app,Client
from pymongo import MongoClient,DESCENDING
from flask_pymongo import PyMongo
from flask import Flask, jsonify, session, redirect, url_for, request
from flask_session import Session 
from flask_cors import CORS
from datetime import datetime
from pymongo.errors import DuplicateKeyError

#Create Session
Session(app)

import manage_users

fn = Client.finance476_database
messages = fn.messages #Connect to messges
watchlist = fn.watchlist# Connect to watchlist


CORS(app, resources={r"/*": {"origins": "*"}})

try: #Set email as primary key from watchlist
    fn.watchlist.create_index("email", unique=True)
except DuplicateKeyError:
    pass


@app.route('/messages', methods=['GET'])
def get_messages():
    try:
        #Get all messages
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
    
    try:#Send message

        email = request.json['email']
        content = request.json['content']
        timestamp = request.json['timestamp'] if 'timestamp' in request.json else datetime.now()


        new_message = {
            
            'email': email,
            'content': content,
            'timestamp': timestamp
        }

        messages.insert_one(new_message)

    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the message', 'details': str(e)}), 500



@app.route('/get-watchlist', methods=['GET'])
def get_watchlist():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    user_watchlist = fn.watchlist.find_one({"email": email})
    symbols = user_watchlist.get("symbols", []) if user_watchlist else []
    print({"symbols": symbols})
    return jsonify({"symbols": symbols})
    

@app.route('/check-if-in-watchlist', methods=['GET'])
def check_if_in_watchlist():
    symbol = request.args.get('symbol')
    email = request.args.get('email')
    
    if not symbol or not email:
        return jsonify({"error": "Symbol and email are required"}), 400

    # Find the user's watchlist document
    user_watchlist = fn.watchlist.find_one({"email": email})
    
    if not user_watchlist:
        return jsonify({"inWatchlist": False})

    # Check if the symbol is in the user's watchlist
    in_watchlist = symbol in user_watchlist.get("symbols", [])

    return jsonify({"inWatchlist": in_watchlist})


@app.route('/add-to-watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    symbol = data.get('symbol')
    email = data.get('email')
 
    if not symbol or not email:
        return jsonify({"error": "Symbol and email are required"}), 400

    # Find the user's watchlist document
    user_watchlist = fn.watchlist.find_one({"email": email})

    if user_watchlist:
        # Check if the symbol is already in the watchlist
        if symbol in user_watchlist.get("symbols", []):
            return jsonify({"error": "Symbol is already in the watchlist"}), 400
        # Add the symbol to the user's watchlist
        fn.watchlist.update_one({"email": email}, {"$addToSet": {"symbols": symbol}})
    else:
        # Create a new watchlist document for the user
        fn.watchlist.insert_one({"email": email, "symbols": [symbol]})

    return jsonify({"message": "Symbol added to watchlist"})

# Endpoint to remove a stock from the watchlist
@app.route('/remove-from-watchlist', methods=['POST'])
def remove_from_watchlist():
    data = request.get_json()
    symbol = data.get('symbol')
    email = data.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    result = fn.watchlist.update_one({"email": email}, {"$pull": {"symbols": symbol}})
    if result.modified_count == 0:
        return jsonify({"error": "Symbol not found in watchlist"}), 404

    return jsonify({"message": "Symbol removed from watchlist"})
