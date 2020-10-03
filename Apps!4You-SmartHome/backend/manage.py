from flask_script import Manager

from project import create_app, db
from project.api.models import Device, AppUser, Sensor

app = create_app()
manager = Manager(app)


@manager.command
def recreate_db():
    """Recreates a database."""
    db.drop_all()
    db.create_all()
    db.session.commit()



@manager.command
def seed_db():
    """Seeds the database."""
    db.session.add(Device(device_name='Raspberry Pi 1'))
    db.session.add(Device(device_name='Raspberry Pi 2'))
    db.session.add(Device(device_name='Raspberry Pi test usuwania'))
    db.session.add(Device(device_name='Raspberry Pi test usuwania #2'))	
    db.session.add(Sensor(sensor_name='Czujnik testowy – usuwanie', sensor_type="pressure", sensor_model="BME280", sensor_device="1", sensor_time="7"))
    db.session.add(Sensor(sensor_name='Czujnik testowy – usuwanie #2', sensor_type="pressure", sensor_model="BME280", sensor_device="2", sensor_time="5"))   
    db.session.add(AppUser(login="test", password="test"))
    db.session.commit()


if __name__ == '__main__':
    manager.run()