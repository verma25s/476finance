from main import app,PyMongo,Bcrypt,fn_database
from flask import Flask, jsonify, session, redirect, url_for, request

from flask_cors import CORS
import os
from flask_session import Session
CORS(app)



Session(app)

users = fn_database.users


bcrypt = Bcrypt(app) #bcrypt to encrypt saved password data
#set CORS
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/register', methods=['POST'])
def register():#Register
    #Get Data
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    email = request.json['email']  
    dob = request.json['dob'] 
    

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')#Crypt Password
    
    if users.find_one({'email': email}):#Check if user already exists
        return jsonify({'error': 'email already exists!'}), 409
    #Create User
    if users.insert_one({'name': name,'email': email, 'password': hashed_password, 'dob': dob,}):
        return jsonify({'success': 'User registered successfully!'}), 201


@app.route('/login', methods=['POST'])
def login():#Login
    email = request.json.get('email')
    password = request.json.get('password')

    user = users.find_one({'email': email})

    if user is None:# Check if email doesnt exist
        return jsonify({'error': 'Email does not exist!'}), 404

    if bcrypt.check_password_hash(user['password'], password):# for an existing email check if the password matches
        session['email'] = email
        return jsonify({'success': 'Login successful!'}), 200

    return jsonify({'error': 'Invalid password!'}), 401

@app.route('/logout', methods=['GET','POST'])
def logout():#Clear session
    session.clear()
    return jsonify({'success': 'Logged out successfully!'}), 200






