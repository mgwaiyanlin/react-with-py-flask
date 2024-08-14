from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"

# give False as we don't really care about the modifications that SQLAlchemy does
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all() # create all tables that we need in our database.

# debug True to help debugging
if __name__ == "__main__":
    app.run(debug=True)


