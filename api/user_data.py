from main import app, Client
from pymongo import DESCENDING
from flask import jsonify, session, request
from datetime import datetime

fn        = Client.finance476_database
messages  = fn.messages
watchlist = fn.watchlist

try:
    fn.watchlist.create_index("email", unique=True)
except Exception:
    pass


def _require_login():
    """Return the logged-in email from the server-side session, or None.
    Identity always comes from the session — never from a client-supplied field."""
    return session.get('email')


@app.route('/messages', methods=['GET'])
def get_messages():
    try:
        all_messages = fn.messages.find().sort('timestamp', DESCENDING)
        return jsonify([{
            '_id':       str(m['_id']),
            'email':     m['email'],
            'content':   m['content'],
            'timestamp': m['timestamp'],
        } for m in all_messages]), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch messages', 'details': str(e)}), 500


@app.route('/add-messages', methods=['POST'])
def add_messages():
    email = _require_login()
    if not email:
        return jsonify({'error': 'You must be logged in to post a message'}), 401
    data    = request.get_json(silent=True) or {}
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Message content is required'}), 400
    try:
        messages.insert_one({'email': email, 'content': content, 'timestamp': datetime.utcnow()})
        return jsonify({'success': 'Message added successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'Failed to add message', 'details': str(e)}), 500


@app.route('/get-watchlist', methods=['GET'])
def get_watchlist():
    email = _require_login()
    if not email:
        return jsonify({'error': 'You must be logged in to view your watchlist'}), 401
    user_wl  = fn.watchlist.find_one({'email': email})
    symbols  = user_wl.get('symbols', []) if user_wl else []
    return jsonify({'symbols': symbols})


@app.route('/check-if-in-watchlist', methods=['GET'])
def check_if_in_watchlist():
    email  = _require_login()
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({'error': 'Symbol is required'}), 400
    if not email:
        return jsonify({'inWatchlist': False})
    user_wl     = fn.watchlist.find_one({'email': email})
    in_watchlist = symbol in user_wl.get('symbols', []) if user_wl else False
    return jsonify({'inWatchlist': in_watchlist})


@app.route('/add-to-watchlist', methods=['POST'])
def add_to_watchlist():
    email = _require_login()
    if not email:
        return jsonify({'error': 'You must be logged in to use your watchlist'}), 401
    data   = request.get_json(silent=True) or {}
    symbol = data.get('symbol')
    if not symbol:
        return jsonify({'error': 'Symbol is required'}), 400
    user_wl = fn.watchlist.find_one({'email': email})
    if user_wl:
        if symbol in user_wl.get('symbols', []):
            return jsonify({'error': 'Symbol already in watchlist'}), 400
        fn.watchlist.update_one({'email': email}, {'$addToSet': {'symbols': symbol}})
    else:
        fn.watchlist.insert_one({'email': email, 'symbols': [symbol]})
    return jsonify({'message': 'Symbol added to watchlist'})


@app.route('/remove-from-watchlist', methods=['POST'])
def remove_from_watchlist():
    email = _require_login()
    if not email:
        return jsonify({'error': 'You must be logged in to use your watchlist'}), 401
    data   = request.get_json(silent=True) or {}
    symbol = data.get('symbol')
    if not symbol:
        return jsonify({'error': 'Symbol is required'}), 400
    result = fn.watchlist.update_one({'email': email}, {'$pull': {'symbols': symbol}})
    if result.modified_count == 0:
        return jsonify({'error': 'Symbol not found in watchlist'}), 404
    return jsonify({'message': 'Symbol removed from watchlist'})
