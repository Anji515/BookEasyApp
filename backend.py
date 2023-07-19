from flask import Flask, jsonify, request, g
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from bson import json_util, ObjectId
from models import Movie, Show, Theater

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'iam_admin'
app.config['MONGO_URI'] = os.getenv('MONGO_URL')
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Hash the password with bcrypt before saving it to the database


def hash_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8'), rounds=5)


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
        # Default to 'user' if 'type' is not provided
        'type': user.get('type'),
    }
    result = mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)})

# Getting all users


@app.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    user_list = []
    for user in users:
        user_dict = {
            '_id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'password': user['password'],
            'gender': user['gender'],
            'membership': user['membership'],
            'type': user['type'],
        }
        user_list.append(user_dict)
    return json_util.dumps(user_list)


# Deleting a user
@app.route('/user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Find the user document by its unique ID
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if user:
        # Delete the user from the database
        mongo.db.users.delete_one({'_id': ObjectId(user_id)})
        return jsonify({'message': f'User with ID {user_id} deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# Updating a user


@app.route('/user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    # Retrieve the updated data from the request
    updated_data = request.get_json()
    # Find the user document by its unique ID
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if user:
        # Update the user document with the new data
        mongo.db.users.update_one({'_id': ObjectId(user_id)}, {
                                  '$set': updated_data})
        return jsonify({'message': f'User with ID {user_id} updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# login as a user


@app.route("/user", methods=["GET"])
def login():
    # Retrieve the data from the request
    email = request.args.get('email')
    password = request.args.get('password')

    # Find the user document by username
    user = mongo.db.users.find_one({"email": email})
    # print(user)
    if user and bcrypt.check_password_hash(user["password"], password):
        return json_util.dumps(user), 200
    else:
        return jsonify({"Error": "Invalid username or password"}), 201

# Login as admin


@app.route("/admin", methods=["GET"])
def adminLogin():
    # Retrieve the data from the request
    email = request.args.get('email')
    password = request.args.get('password')

    # Find the user document by username
    user = mongo.db.users.find_one({"email": email})
    # print(user)
    if user and bcrypt.check_password_hash(user["password"], password):
        return json_util.dumps(user), 200
    else:
        return jsonify({"Error": "Invalid username or password"}), 201


# Posting a Movie


@app.route('/movies', methods=['POST'])
def create_movie():
    movie_data = request.get_json()
    movie = Movie(**movie_data)
    movie.save()
    return jsonify({'message': 'Movie created successfully', 'movie_id': str(movie.id)}), 200

# Get all Movies data


@app.route('/movies', methods=['GET'])
def get_movies():
    movies = Movie.objects()
    movie_list = [movie.to_mongo().to_dict() for movie in movies]
    return json_util.dumps(movie_list), 200

# Delete a specific Movies data


@app.route('/movies/<string:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    # Find the movie by its ID
    movie = Movie.objects(id=movie_id).first()
    if not movie:
        return jsonify({"message": f"Movie not found with ID {movie_id}"}), 404

    # Delete the movie
    movie.delete()

    return jsonify({"message": "Movie deleted successfully with ID {movie_id}"}), 200

# Update a specific Movies data


@app.route('/movies/<string:movie_id>', methods=['PATCH'])
def update_movie(movie_id):
    # Find the movie by its ID
    movie = Movie.objects(id=movie_id).first()
    if not movie:
        return jsonify({"message": f"Movie not found with ID {movie_id}"}), 404

    # Get the updated data from the request body
    updated_data = request.get_json()

    # Update the movie fields
    movie.title = updated_data.get('title', movie.title)
    movie.description = updated_data.get('description', movie.description)
    movie.duration = updated_data.get('duration', movie.duration)
    movie.genre = updated_data.get('genre', movie.genre)
    movie.language = updated_data.get('language', movie.language)
    movie.release_date = updated_data.get('release_date', movie.release_date)
    movie.image_cover = updated_data.get('image', movie.image_cover)
    movie.rating = updated_data.get('rating', movie.rating)

    # Save the changes to the database
    movie.save()
    return json_util.dumps({"message": "Movie updated successfully", "movie_id": movie_id}), 200


# Posting a Theater
@app.route('/theaters', methods=['POST'])
def create_theater():
    theater_data = request.get_json()
    theater = Theater(**theater_data)
    theater.save()
    return jsonify({'message': 'Theater created successfully', 'theater_id': str(theater.id)}), 200

# Get all theaters data


@app.route('/theaters', methods=['GET'])
def get_theaters():
    theaters = Theater.objects()
    # Convert MongoDB documents to dictionaries
    theaters_list = [theater.to_mongo().to_dict() for theater in theaters]
    return json_util.dumps(theaters_list), 200

# Update a specific theater


@app.route('/theaters/<string:theater_id>', methods=['PATCH'])
def update_theater(theater_id):
    # Find the theater by its ID
    theater = Theater.objects(id=theater_id).first()
    if not theater:
        return jsonify({"message": f"Theater not found with ID {theater_id}"}), 404

    # Get the updated data from the request body
    updated_data = request.get_json()
    # Update the theater fields
    theater.name = updated_data.get('name', theater.name)
    theater.address = updated_data.get('address', theater.address)
    theater.city = updated_data.get('city', theater.city)
    theater.state = updated_data.get('state', theater.state)
    theater.capacity = updated_data.get('capacity', theater.capacity)

    # Save the changes to the database
    theater.save()
    return jsonify({"message": "Theater updated successfully", "theaterID": theater_id}), 200

# Delete a specific theaters data


@app.route('/theaters/<string:theater_id>', methods=['DELETE'])
def delete_theater(theater_id):
    # Find the theater by its ID
    theater = Theater.objects(id=theater_id).first()
    if not theater:
        return jsonify({"message": f"Theater with ID {theater_id} is not found"}), 404
    # Delete the theater
    theater.delete()
    return jsonify({"message": f"Show deleted successfully with ID {theater_id}"}), 200


# Posting A show data
@app.route('/shows', methods=['POST'])
def create_show():
    show_data = request.get_json()
    # Get the Movie and Theater IDs from the request JSON
    movie_id = show_data.get('movie_id')
    theater_id = show_data.get('theater_id')
    # Find the Movie and Theater documents by their IDs
    movie = Movie.objects(id=movie_id).first()
    theater = Theater.objects(id=theater_id).first()
    if not movie or not theater:
        return jsonify({"message": "Invalid Movie or Theater ID"}), 400
    # Create a new Show document with the provided data
    show = Show(movie_id=movie, theater_id=theater, show_timing=show_data.get(
        'show_timing', []), category=show_data.get('category', []), dates=show_data.get('dates', []))
    show.save()

    return jsonify({"message": "Show created successfully", "show_id": str(show.id)}), 201


# Get all shows data
@app.route('/shows', methods=['GET'])
def get_shows():
    shows = Show.objects()
    # Convert MongoDB documents to dictionaries
    show_list = [show.to_mongo().to_dict() for show in shows]
    return json_util.dumps(show_list), 200

# Update the specific show data


@app.route('/shows/<string:show_id>', methods=['PATCH'])
def update_show(show_id):
    show_data = request.get_json()

    # Find the show by its ID
    show = Show.objects(id=show_id).first()
    if not show:
        return jsonify({"message": "Show not found"}), 404

    # Update the show with the new data
    show.movie_id = show_data.get('movie_id', show.movie_id)
    show.theater_id = show_data.get('theater_id', show.theater_id)
    show.show_timing = show_data.get('show_timing', show.show_timing)
    show.category = show_data.get('category', show.category)
    show.dates = show_data.get('dates', show.dates)
    show.save()

    return jsonify({"message": f"Show updated successfully for ID - {show_id}"}), 200

# Delete the specific show data


@app.route('/shows/<string:show_id>', methods=['DELETE'])
def delete_show(show_id):
    # Find the show by its ID
    show = Show.objects(id=show_id).first()
    if not show:
        return jsonify({"message": f"Show with ID {show_id} is not found"}), 404
    # Delete the show
    show.delete()
    return jsonify({"message": f"Show deleted successfully with ID {show_id}"}), 200


if __name__ == '__main__':
    app.run(debug=True)
