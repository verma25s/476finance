from main import app
from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import MongoClient

Client = MongoClient('localhost',27017)

fn = Client.finance476_database
forumposts = fn.forumposts

CORS(app, resources={r"/*": {"origins": "*"}})




@app.route('/forum-posts', methods=['GET'])
def get_forum_posts():
    try:
        posts = list(forumposts.find().sort("timestamp", -1))
        formatted_posts = [{
            'title': post['title'],
            '_id': str(post['_id']),
            'email': post['email'],
            'content': post['content'],
            'timestamp': post['timestamp']
            
        } for post in posts]
        return jsonify(formatted_posts), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching posts', 'details': str(e)}), 500

@app.route('/add-forum-post', methods=['POST'])
def add_forum_post():
    try:
        data = request.json
        if 'email' not in data or 'content' not in data:
            raise KeyError('Invalid data provided')

        new_post = {
            'email': data['email'],
            'content': data['content'],
            'timestamp': datetime.utcnow(),
            'title': data['title']
        }
        forumposts.insert_one(new_post)
        return jsonify({'message': 'Post added successfully'}), 200
    except KeyError as e:
        return jsonify({'error': 'Invalid data provided', 'details': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the post', 'details': str(e)}), 500

@app.route('/delete-forum-post/<post_id>', methods=['DELETE'])
def delete_forum_post(post_id):
    try:
        result = forumposts.delete_one({'_id': ObjectId(post_id)})
        if result.deleted_count == 1:
            return jsonify({'message': 'Post deleted successfully'}), 200
        else:
            return jsonify({'error': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred while deleting the post', 'details': str(e)}), 500




@app.route('/forum-posts/<title>', methods=['GET'])
def get_forum_post(title):
    try:
        post = forumposts.find_one({'title': title})
        if post:
            formatted_post = {
                'title': post['title'],
                'email': post['email'],
                'content': post['content'],
                'timestamp': post['timestamp']
            }
            return jsonify(formatted_post), 200
        else:
            return jsonify({'error': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching the post', 'details': str(e)}), 500