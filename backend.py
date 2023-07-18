from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import bcrypt

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URL')
mongo = PyMongo(app)

# Hash the password with bcrypt before saving it to the database
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

@app.route('/user', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    user_list = []
    for user in users:
        user_dict = {
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


if __name__ == '__main__':
    app.run(debug=True)