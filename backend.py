from flask import Flask, jsonify, request, g
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'iam_admin'
app.config['MONGO_URI'] = os.getenv('MONGO_URL')
mongo = PyMongo(app)
bcrypt=Bcrypt(app)

# Hash the password with bcrypt before saving it to the database
def hash_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8'),rounds=5)

# def verify_password(password, hashed_password):
#     return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

# def generate_jwt_token(user_id, user_type):
#     payload = {
#         'user_id': user_id,
#         'user_type': user_type,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expiry time (1 day in this example)
#     }
#     token_bytes = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
#     return token_bytes

@app.route("/user", methods=["GET"])
def login():
    # Retrieve the data from the request
    email = request.args.get('email')
    password = request.args.get('password')

    # Find the user document by username
    user = mongo.db.users.find_one({"email": email})
    # print(user)
    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify(str(user)), 200
    else:
        return jsonify({"Error": "Invalid username or password"}), 201


# @app.route('/user', methods=['GET'])
# def get_users():
#     users = mongo.db.users.find()
#     user_list = []
#     for user in users:
#         user_dict = {
#             '_id':str(user['_id']),
#             'name': user['name'],
#             'email': user['email'],
#             'password': user['password'],
#             'gender': user['gender'],
#             'membership': user['membership'],
#             'type': user['type'],
#         }
#         user_list.append(user_dict)
#     return jsonify(user_list)

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
        'type': user.get('type'),  # Default to 'user' if 'type' is not provided
    }
    result = mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)})

# Add other routes and functions for updating, deleting, and retrieving users by ID

# @app.route('/admin', methods=['POST'])
# def admin_login():
#     login_data = request.get_json()
#     email = login_data['email']
#     password = login_data['password']

#     admin = mongo.db.users.find_one({"email": email})
#     if not admin or not verify_password(password, admin['password']):
#         return jsonify({"message": "Invalid username or password"}), 401

#     admin_id = str(admin['_id'])
#     admin_type = admin['type']
#     if admin_type != 'admin':
#         return jsonify({"message": "Unauthorized"}), 401

#     jwt_token = generate_jwt_token(admin_id, admin_type)

#     return jsonify({"token": jwt_token}), 200


@app.route('/admin', methods=['GET'])
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