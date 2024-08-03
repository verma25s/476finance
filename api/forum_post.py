from main import app,finance476_database
from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import MongoClient,DESCENDING




fn = finance476_database
#Contact to formposts collection
forumposts = fn.forumposts

#Enable CORS to all
CORS(app, resources={r"/*": {"origins": "*"}})




@app.route('/forum-posts', methods=['GET'])
def get_forum_posts():
    try:
        posts = list(forumposts.find().sort('timestamp', DESCENDING))# Fetch all formposts sorted by data
       
        formatted_posts = [{  #Formatted posts
            'title': post['title'],
            '_id': str(post['_id']),
            'email': post['email'],
            'content': post['content'],
            'timestamp': post['timestamp']
            
        } for post in posts]
        return jsonify(formatted_posts), 200 #Return posts
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching posts', 'details': str(e)}), 500 #Return error

@app.route('/add-forum-post', methods=['POST']) # Add form post
def add_forum_post():
    try:
        data = request.json
        if 'email' not in data or 'content' not in data: #Error checking to see if any data is missing
            raise KeyError('Invalid data provided')

        new_post = { # Format the post
            'email': data['email'],
            'content': data['content'],
            'timestamp': datetime.utcnow(),
            'title': data['title']
        }

        forumposts.insert_one(new_post)  #Add post
        return jsonify({'message': 'Post added successfully'}), 200
    except KeyError as e:  #Error checking
        return jsonify({'error': 'Invalid data provided', 'details': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the post', 'details': str(e)}), 500


@app.route('/delete-forum-post/<post_id>', methods=['DELETE'])
def delete_forum_post(post_id): #Delete post
    try:# since logged in was already checked in React-Session
        result = forumposts.delete_one({'_id': ObjectId(post_id)})
        if result.deleted_count == 1:
            return jsonify({'message': 'Post deleted successfully'}), 200
        else:
            return jsonify({'error': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred while deleting the post', 'details': str(e)}), 500




@app.route('/forum-posts/<title>', methods=['GET']) # Fetch by title , so the title shows in the url instead if id
def get_forum_post(title):
    try: #Get a specific form post when user clicks on it
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