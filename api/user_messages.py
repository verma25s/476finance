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



