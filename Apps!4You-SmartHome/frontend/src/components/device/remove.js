import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";



class RemoveDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
			devices: [],
			sensors:[],
			answer:[],
			device: "",
			status: ""
		};
		this.handleChange = this.handleChange.bind(this);
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
	
	handleChange(event) {
		this.setState({device: event.target.value});
	}
	
	getSensor(deviceID) {
		for (let i = 0; i < this.state.sensors.length; i++){
			if (this.state.sensors[i].device == deviceID){
				let id = this.state.sensors[i].id
				let device = ""
				let date = this.getDate()
				
				fetch(API + 'sensor', {
					headers: {'Content-Type': 'application/json'},
					method: "PATCH",
					body: JSON.stringify({
						UserToken: "aaaa-bbbb-cccc-dddd",
						SensorID: id,
						SensorDevice: device,
						Event: {
							Type: "UPDATE",
							Timestamp: date
						}
					})
				})
					.then((response) => response.json())	
			}
		}		
	}
	
    handleSubmit(event) {
		const id = this.state.device
		let date = this.getDate()		
		event.preventDefault();

		fetch(API + 'device', {
			headers: {'Content-Type': 'application/json'},
			method: "DELETE",
			body: JSON.stringify({
				UserToken: "aaaa-bbbb-cccc-dddd",
				DeviceID: id,
				Event: {
                    Type: "REMOVE",
                    Timestamp: date
                }				
			})
		})
			.then((response) => response.json())
			.then((data) => this.setState({status: data.Status}))
			.catch((data) => console.log(data))
			
		this.getSensor(id)
    }
		
	choseDevice() {
		if (this.state.model === "") {

		} else {
			return(
				<div>
					<label htmlFor="Device">Urządzenie</label>
					<br />	
					<select value={this.state.device} onChange={this.handleChange}>
						<option value="">Wybierz</option>
						{this.state.devices.map((device) => <option value={device.id}>{device.name}</option>)}
					</select>
				</div>
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
        if (this.state.status === "SUCCESS") {
            status = <div className="alert alert-success" role="alert">
                Pomyślnie usunięto urzadzenie
            </div>
        } else if (this.state.status === "FAILED") {
            status = <div className="alert alert-danger" role="alert">
                Nie można usunąć urzadzenia
            </div>

        }
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<h1>Wybierz urzązenie do usunięcia</h1>
						<br />									
						{this.choseDevice()}
						<br /> 
					</div>
					<button className="btn btn-primary">Usuń urządzenie</button>					
				</form>
				{status}
			</div>
		);
	}
}

export default RemoveDevice