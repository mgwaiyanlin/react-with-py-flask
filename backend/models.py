from app import db

class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(200), nullable=True)

    # whenever we want to convert the friends-db to json, we will call this function.
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "role": self.role,
            "description": self.description,
            "imgUrl": self.img_url
        }

