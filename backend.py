from flask import Flask, jsonify, request, g
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import datetime

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'iam_admin'
app.config['MONGO_URI'] = os.getenv('MONGO_URL')
mongo = PyMongo(app)

# Hash the password with bcrypt before saving it to the database
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def generate_jwt_token(user_id, user_type):
    payload = {
        'user_id': user_id,
        'user_type': user_type,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expiry time (1 day in this example)
    }
    token_bytes = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token_bytes

@app.route('/user', methods=['POST'])
def user_login():
    login_data = request.get_json()
    email = login_data['email']
    password = login_data['password']

    user = mongo.db.users.find_one({"email": email})
    if not user or not verify_password(password, user['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    user_id = str(user['_id'])
    user_type = user['type']
    if user_type != 'user':
        return jsonify({"message": "Unauthorized"}), 401

    jwt_token = generate_jwt_token(user_id, user_type)

    return jsonify({"token": jwt_token}), 200


@app.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    user_list = []
    for user in users:
        user_dict = {
            '_id':str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'gender': user['gender'],
            'membership': user['membership'],
            'type': user['type'],
        }
        user_list.append(user_dict)
    return jsonify(user_list)

@app.route('/signup', methods=['POST'])
def create_user():
    user = request.get_json()
    if 'name' not in user or 'email' not in user or 'password' not in user:
        return jsonify({'message': 'Name, email, and password are required fields'}), 400

    # Hash the password before saving it to the database
    hashed_password = hash_password(user['password'])
    new_user = {
        'name': user['name'],
        'email': user['email'],
        'password': hashed_password,
        'gender': user.get('gender'),
        'membership': user.get('membership'),
        'type': user.get('type', 'user'),  # Default to 'user' if 'type' is not provided
    }
    result = mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)})

# Add other routes and functions for updating, deleting, and retrieving users by ID

@app.route('/admin', methods=['POST'])
def admin_login():
    login_data = request.get_json()
    email = login_data['email']
    password = login_data['password']

    admin = mongo.db.users.find_one({"email": email})
    if not admin or not verify_password(password, admin['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    admin_id = str(admin['_id'])
    admin_type = admin['type']
    if admin_type != 'admin':
        return jsonify({"message": "Unauthorized"}), 401

    jwt_token = generate_jwt_token(admin_id, admin_type)

    return jsonify({"token": jwt_token}), 200

# Admin authentication decorator to protect admin routes
def admin_protected_route(route_func):
    def wrapper(*args, **kwargs):
        auth_token = request.headers.get('Authorization')
        if not auth_token:
            return jsonify({"message": "Unauthorized"}), 401

        try:
            payload = jwt.decode(auth_token, app.config['SECRET_KEY'], algorithms=['HS256'])
            if payload['type'] == 'admin':
                g.user_id = payload['_id']  # Store the user ID in the Flask app context (g)
                return route_func(*args, **kwargs)
            else:
                return jsonify({"message": "Unauthorized"}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

    wrapper.__name__ = route_func.__name__  # Preserve the original function name for better debugging
    return wrapper

@app.route('/admin', methods=['GET'])
# @admin_protected_route
def get_all_users():
    users = mongo.db.users.find()
    user_list = []
    for user in users:
        user_dict = {
            '_id':str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'gender': user['gender'],
            'membership': user['membership'],
            'type': user['type'],
        }
        # user['_id'] = str(user['_id'])
        user_list.append(user_dict)
    return jsonify(user_list)



if __name__ == '__main__':
    app.run(debug=True)