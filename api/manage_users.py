from main import app, fn_database
from flask import jsonify, session, request
from flask_bcrypt import Bcrypt
import re

users   = fn_database.users
bcrypt  = Bcrypt(app)

EMAIL_RE          = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
MIN_PASSWORD_LEN  = 8


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or {}
    missing = [f for f in ('name', 'email', 'password', 'dob') if not data.get(f)]
    if missing:
        return jsonify({'error': f"Missing required field(s): {', '.join(missing)}"}), 400
    name, email, password, dob = data['name'], data['email'], data['password'], data['dob']
    if not EMAIL_RE.match(email):
        return jsonify({'error': 'Please enter a valid email address'}), 400
    if len(password) < MIN_PASSWORD_LEN:
        return jsonify({'error': f'Password must be at least {MIN_PASSWORD_LEN} characters'}), 400
    if users.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 409
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    result = users.insert_one({'name': name, 'email': email, 'password': hashed, 'dob': dob})
    if result.acknowledged:
        return jsonify({'success': 'User registered successfully'}), 201
    return jsonify({'error': 'Failed to register user'}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email, password = data.get('email'), data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    user = users.find_one({'email': email})
    if user is None:
        return jsonify({'error': 'Email does not exist'}), 404
    if bcrypt.check_password_hash(user['password'], password):
        session['email'] = email
        return jsonify({'success': 'Login successful'}), 200
    return jsonify({'error': 'Invalid password'}), 401


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    return jsonify({'success': 'Logged out successfully'}), 200
