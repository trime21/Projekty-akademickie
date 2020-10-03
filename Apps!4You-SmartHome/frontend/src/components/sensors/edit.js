import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";



class EditSensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
			devices: [],
			sensors: [],
			sensor: "",
			sensorName: "",
			device: "",
			sensorTime: "",
			answer: []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    componentDidMount() {
        fetch(API + 'device', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        })
            .then((response) => response.json())
            .then((data) => this.setState({devices: data.devices}))
		
		fetch(API + 'sensor', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        })
            .then((response) => response.json())
            .then((data) => this.setState({sensors: data.sensors}))
    }
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		 
		const setName = (target.name === "sensor") ? this.getSensor(value).name : (target.name === "sensorName") ? value :this.state.sensorName;
		const setDevice = (target.name === "sensor") ? this.getSensor(value).device : (target.name === "device") ? value : this.state.device;
		const setTime = (target.name === "sensor") ? this.getSensor(value).time : (target.name === "sensorTime") ? value : this.state.sensorTime;

		this.setState({
			[name]: value,
			sensorName: setName,
			device: setDevice,
			sensorTime: setTime,
		});
	}
	
	getSensor(id) {
		for (let i = 0; i < this.state.sensors.length; i++){
			if (this.state.sensors[i].id == id){
				return this.state.sensors[i];
			}
		}		
	}
	
    handleSubmit(event) {
		let id = this.state.sensor
		let name = this.state.sensorName
		let device = this.state.device
		let time = this.state.sensorTime
		let date = this.getDate()		
		
        event.preventDefault();
		
        fetch(API + 'sensor', {
            headers: {'Content-Type': 'application/json'},
            method: "PATCH",
            body: JSON.stringify({
                UserToken: "aaaa-bbbb-cccc-dddd",
				SensorID: id,
				SensorName: name,
				SensorDevice: device,
				SensorTime: time,
                Event: {
                    Type: "UPDATE",
                    Timestamp: date
                }
            })
        })
            .then((response) => response.json())
            .then((data) => this.setState({answer: data}))
            .catch((data) => console.log(data))			
    }
	
	choseSensor() {
		return(
			<div>
				<select name="sensor" value={this.state.sensor} onChange={this.handleInputChange}>
					<option value="">Wybierz</option>
					{this.state.sensors.map((sensor) => <option value={sensor.id}>{sensor.name}</option>)}
				</select>
			</div>
		);		
	}

	choseDevice() {
		return(
			<div>
				<select name="device" value={this.state.device} onChange={(e) => this.setState({device: e.target.value})}>
					<option value="">Wybierz</option>
					{this.state.devices.map((device) => <option value={device.id}>{device.name}</option>)}
				</select>
			</div>
		);		
	}	
	
	moreInfo(){
		return(
			<div>
				<input type="text" className="form-control" name="sensorName" value={this.state.sensorName} aria-describedby="DeviceNameHelp" placeholder="Termometr" onChange={this.handleInputChange}/>
				<small id="DeviceNameHelp" className="form-text text-muted">Nazwa pod jaką urządznie będzie później dostęptne w systemie</small>
			</div>	
		);	
	}
	
	timeUpdate(){
		return(
			<div>
				<input type="number" className="form-control" name="sensorTime" value={this.state.sensorTime} max={600} min={1} aria-describedby="DeviceTimeUpdate" placeholder="0" onChange={this.handleInputChange}/>
				<small id="DeviceTimeUpdate" className="form-text text-muted">Częstotliwość aktualizacji stanu czujnika</small>
			</div>	
		);	
	}
	
	submitData(){
		if (this.state.sensorName === "" || this.state.model === "") {

		} else {
			return(
				<button className="btn btn-primary">Zaaktualizuj czujnik</button>
			);
		}	
	}
	
	
	getDate() {
		let year = new Date().getFullYear(); //Current Year
		let month = new Date().getMonth() + 1; //Current Month
		let day = new Date().getDate(); //Current Date
		let hours = new Date().getHours(); //Current Hours
		let min = new Date().getMinutes(); //Current Minutes
		let sec = new Date().getSeconds(); //Current Seconds

		let result = year + '-'
		result = result + ((month < 10) ? (+ 0 + month.toString()) : + month)
		result = result + '-' + ((day < 10) ? (+ 0 + day.toString()) : + day) 
		result = result + ' ' + ((hours < 10) ? (+ 0 + hours.toString()) : + hours) 
		result = result + ':' + ((min < 10) ? (+ 0 + min.toString()) : + min) 
		result = result + ':' + ((sec < 10) ? (+ 0 + sec.toString()) : + sec)
		return result		
	}
	
	
	render() {
		let status;
		let username = localStorage.getItem('username');
		let pageTitle;
		let formOnSite;
		
        if (this.state.answer.Status === "SUCCESS") {
            status = <div className="alert alert-success" role="alert">
                {this.state.answer.Message}
            </div>
        } else if (this.state.answer.Status === "FAILED") {
            status = <div className="alert alert-danger" role="alert">
				{this.state.answer.Message}
            </div>
        }
		
		if (username) {
			formOnSite = <form onSubmit={this.handleSubmit}>
					<table className="table table-borderless table-responsive-lg">
						<tr>
							<td>
								<label htmlFor="Sensor">Czujnik</label>
								<br />
								{this.choseSensor()}
							</td>
							<td>
								<label htmlFor="BlackBox">BlackBox</label>
								<br />
								{this.choseDevice()}
							</td>
							<td>
								<label htmlFor="Device">Nazwa</label>
								<br />
								{this.moreInfo()}
							</td>
							<td>
								<label htmlFor="TimeUpdate">Czas</label>
								<br />
								{this.timeUpdate()}
							</td>
						</tr>
					</table>						
					{this.submitData()}					
				</form>
			pageTitle = <h1>Edytuj czujnik</h1>
		} else {
			pageTitle = <div className="alert alert-danger" role="alert">
							<h1>Dostęp tylko dla zalogowanych użytkowników</h1>
						</div>
		}	
		

		return (
			<div className="container">
				{pageTitle}
				{formOnSite}
				{status}
			</div>
		);
	}
}

export default EditSensor