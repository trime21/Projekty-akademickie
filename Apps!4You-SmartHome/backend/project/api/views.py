import datetime
import pytz
import time

from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, create_access_token
from sqlalchemy import update
from project import db, bcrypt
from project.api.models import Device, AppUser, Sensor

mem_user_token = "aaaa-bbbb-cccc-dddd"


class DeviceApi(Resource):

    def get_time(self):
        tz = pytz.timezone("Europe/Warsaw")
        millis = int(round(time.time()))
        millis = millis - millis % 30
        date = datetime.datetime.fromtimestamp(millis, tz)
        return date.strftime('%Y-%m-%d %H:%M:%S')	

    #jwt_required
    def post(self):
        args = request.get_json()
        user_token = args['UserToken']
        device_name = args['DeviceName']
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']

        if event_type == 'REGISTER':
            if user_token == mem_user_token:
                device = Device.query.filter_by(device_name=device_name).first()
                if not device:
                    db.session.add(Device(device_name=device_name))
                    db.session.commit()
                    return jsonify(
                        {
                            "DeviceName": device_name,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie dodano urządzenie"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "DeviceName": device_name,
                            "Status": "FAILED",
                            "Message": "Urządzenie o takiej nazwie już istnieje"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )

    #@jwt_required
    def get(self):
        devices = Device.query.all()
        devices_list = []

        for device in devices:
            sensorsInDevice = Sensor.query.filter(Sensor.sensor_device == device.id)
            device_object = {
                'name': device.device_name,
                'id': device.id,
                'activeSensors': 1,
				'activeSensors': sensorsInDevice.count(),
                'state': 'Sprawny',
                'lastUpdated': self.get_time()
            }
            devices_list.append(device_object)
        return jsonify({
            'devices': devices_list
        })

    #@jwt_required
    def patch(self):
        args = request.get_json()
        user_token = args['UserToken']
        id = args['DeviceID'] 	
        device_name = args['DeviceName']		
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']

        if event_type == 'UPDATE':
            if user_token == mem_user_token:    
                device = Device.query.filter_by(id=id).first()
                if device:
                    device.device_name = device_name
                    db.session.commit()
                    return jsonify(
                        {
                            "DeviceID": id,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie zaktualizowano urzadenie"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "DeviceID": id,
                            "Status": "FAILED",
                            "Message": "Nie ma takiego urządzenia"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )
		
    #@jwt_required
    def delete(self):
        args = request.get_json()
        user_token = args['UserToken']
        id = args['DeviceID']
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']		
		
        if event_type == 'REMOVE':		
            if user_token == mem_user_token:    
                device = Device.query.filter_by(id=id).first()
                if device:
                    Device.query.filter_by(id=id).delete()
                    db.session.commit()
                    return jsonify(
                        {
                            "DeviceID": id,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie usunięto urzadzenie"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "DeviceID": id,
                            "Status": "FAILED",
                            "Message": "Nie ma takiego urzadzenia"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )  

class SensorApi(Resource):

    def get_time(self, sensor_time):
        tz = pytz.timezone("Europe/Warsaw")
        millis = int(round(time.time()))
        millis = millis - millis % sensor_time
        date = datetime.datetime.fromtimestamp(millis, tz)
        return date.strftime('%Y-%m-%d %H:%M:%S')		
        
    #@jwt_required
    def post(self):
        args = request.get_json()
        user_token = args['UserToken']
        sensor_name = args['SensorName']
        sensor_type = args['SensorType']
        sensor_model = args['SensorModel']
        sensor_device = args['SensorDevice']
        sensor_time = args['SensorTime']		
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']

        if event_type == 'REGISTER':
            if user_token == mem_user_token:
                sensor = Sensor.query.filter_by(sensor_name=sensor_name).first()
                if not sensor:
                    db.session.add(Sensor(sensor_name=sensor_name, sensor_type=sensor_type, sensor_model=sensor_model, sensor_device=sensor_device, sensor_time=sensor_time))
                    db.session.commit()
                    return jsonify(
                        {
                            "SensorName": sensor_name,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie dodano czujnik"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "SensorName": sensor_name,
                            "Status": "FAILED",
                            "Message": "Czujnik o takiej nazwie już istnieje"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )

    #@jwt_required
    def get(self):
        sensors = Sensor.query.all()
        sensors_list = []

        for sensor in sensors:
            sensor_object = {
                'id': sensor.id,	
                'name': sensor.sensor_name,
                'type': sensor.sensor_type,
                'model': sensor.sensor_model,
                'device': sensor.sensor_device,
                'time': sensor.sensor_time,
                'lastUpdated': self.get_time(sensor.sensor_time)
            }
            sensors_list.append(sensor_object)
        return jsonify({
            'sensors': sensors_list
        })

    #@jwt_required
    def patch(self):
        args = request.get_json()
        user_token = args['UserToken']
        id = args['SensorID'] 	
        sensor_name = args['SensorName']
        sensor_device = args['SensorDevice']
        sensor_time = args['SensorTime']		
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']

        if event_type == 'UPDATE':
            if user_token == mem_user_token:    
                sensor = Sensor.query.filter_by(id=id).first()
                if sensor:
                    sensor.sensor_name = sensor_name
                    sensor.sensor_device = sensor_device
                    sensor.sensor_time = sensor_time
                    db.session.commit()
                    return jsonify(
                        {
                            "SensorID": id,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie zaktualizowano czujnik"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "SensorID": id,
                            "Status": "FAILED",
                            "Message": "Nie ma takiego czujnika"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )
				
    #@jwt_required
    def delete(self):
        args = request.get_json()
        user_token = args['UserToken']
        id = args['SensorID']
        event = args['Event']
        event_type = event['Type']
        event_timestamp = event['Timestamp']

        if event_type == 'REMOVE':
            if user_token == mem_user_token:    
                sensor = Sensor.query.filter_by(id=id).first()
                if sensor:
                    Sensor.query.filter_by(id=id).delete()
                    db.session.commit()
                    return jsonify(
                        {
                            "SensorID": id,
                            "Status": "SUCCESS",
                            "Message": "Pomyślnie usunięto czujnik"
                        }
                    )
                else:
                    return jsonify(
                        {
                            "SensorID": id,
                            "Status": "FAILED",
                            "Message": "Nie ma takiego czujnika"
                        }
                    )
            else:
                return jsonify(
                    {
                        "Status": "FAILED",
                        "Message": "Podano zły token użytkownika"
                    }
                )

class AuthenticationApi(Resource):
    def post(self):
        args = request.get_json()
        login = args['login']
        password = args['password']

        user = AppUser.query.filter_by(login=login).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                expires = datetime.timedelta(days=7)
                return jsonify(
                    {
                        "Status": "AUTHORIZED",
                        "Message": "User successfully authorized",
                        "Token": create_access_token(identity=user.id, expires_delta=expires)
                    }
                )
        return jsonify(
            {
                "Status": "NOT_AUTHORIZED",
                "Message": "Bad username or password"
            }
        )

    #@jwt_required
    def get(self):
        return jsonify({
            "Status": "AUTHORIZED",
            "Message": "User is logged in"
        })