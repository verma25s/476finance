from main import app,PyMongo,Bcrypt
from flask import Flask, jsonify, session, redirect, url_for, request
from pymongo import MongoClient
from flask_cors import CORS

CORS(app)
Client = MongoClient('localhost',27017)



fn_database = Client.finance476_database
users = fn_database.users


bcrypt = Bcrypt(app)
cors = CORS(app,supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
@app.route('/register', methods=['POST'])
def register():
    
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    email = request.json['email']  
    dob = request.json['dob'] 
    

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    if users.find_one({'email': email}):
        return jsonify({'error': 'email already exists!'}), 409

    if users.insert_one({'name': name,'email': email, 'password': hashed_password, 'dob': dob,}):
        return jsonify({'success': 'User registered successfully!'}), 201


@app.route('/login', methods=['GET','POST'])
def login():
    
    email = request.json['email']
    password = request.json['password']

    user = users.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):
        session['email'] = email
        return jsonify({'success': 'Login successful!'}), 200

    return jsonify({'error': 'Invalid email or password!'}), 401

@app.route('/logout', methods=['GET','POST'])
def logout():
    session.pop()
    print("Logout")
    return jsonify({'success': 'Logged out successfully!'}), 200