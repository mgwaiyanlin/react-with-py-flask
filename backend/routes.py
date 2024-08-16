from app import app, db
from flask import request, jsonify
from models import Friend

# Get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    friends_json = [friend.to_json() for friend in friends] # result = [{...}, {...}]
    return jsonify(friends_json)

# Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json

        # input data validation
        required_fields = ["name", "gender", "role", "description"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field => {field}"}), 400

        # assigning input data into variables
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # fetch avatar image api based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
    
        new_friend = Friend(name=name, gender=gender, role=role, description=description, img_url=img_url)
        db.session.add(new_friend)
        db.session.commit() # store into database

        # return jsonify({"message": "Friend created successfully!"}),201
        return jsonify(new_friend.to_json()),201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}),500
    
# Delete a friend
@app.route("/api/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found!"}), 404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Friend was deleted successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Update a friend profile
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404
        
        data = request.json

        friend.name = data.get("name", friend.name)
        friend.gender = data.get("gender", friend.gender)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)

        db.session.commit()
        # return jsonify({"message": "Friend was updated successfully!"})
        return jsonify(friend.to_json()),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
