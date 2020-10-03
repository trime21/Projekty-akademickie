import datetime

from project import db, bcrypt


class Device(db.Model):
    __tablename__ = 'device'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_name = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, device_name):
        self.device_name = device_name
        self.created_at = datetime.datetime.utcnow()

class Sensor(db.Model):
    __tablename__ = 'sensor'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sensor_name = db.Column(db.String(128), nullable=False)
    sensor_type = db.Column(db.String(128), nullable=False)
    sensor_model = db.Column(db.String(128), nullable=False)
    sensor_device = db.Column(db.Integer, nullable=False)
    sensor_time = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, sensor_name, sensor_type, sensor_model, sensor_device, sensor_time):
        self.sensor_name = sensor_name
        self.sensor_type = sensor_type
        self.sensor_model = sensor_model
        self.sensor_device = sensor_device
        self.sensor_time = sensor_time
        self.created_at = datetime.datetime.utcnow()

class AppUser(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    login = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, login, password):
        self.login = login
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
