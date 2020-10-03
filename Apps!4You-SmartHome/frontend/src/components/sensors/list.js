import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";



class SensorsLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: [],
			devices: [],
			sensor: ""
        }
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
	
	choseSensor() {
		if (this.state.model === "") {

		} else {
			return(
				<div>
					<label htmlFor="Sensor">Czujnik</label>
					<br />	
					<select value={this.state.sensor} onChange={(e) => this.setState({sensor: e.target.value})}>
						<option value="">Wybierz</option>
						{this.state.sensors.map((sensor) => <option value={sensor.name}>{sensor.name}</option>)}
					</select>
				</div>
			);		
		}	
	}	
	
	showState(type) {
		switch(type) {
			case 'open':
				return <td>Zamknięte</td>
			case 'light':
				return <td>Zgaszone</td>
			case 'temperature':
				return <td>21°C</td>
			case 'humidity':
				return <td>54 procent</td>
			case 'pressure':
				return <td>1016 hPa</td>
			case 'alarm':
				return <td>Jest ok</td>	
			default:
				return;
		}
	}
	
	getDevice(id) {
		for (let i = 0; i < this.state.devices.length; i++){
			if (this.state.devices[i].id == id){
				return this.state.devices[i].name;
			}
		}
		return ""
	}
	
    render() {
        let sensorTable;
		let username = localStorage.getItem('username');
		let pageTitle;
		let formOnSite;
		
        if (this.state.sensors) {
           sensorTable = <tbody>
               {this.state.sensors.map((sensor) => {
                   return (<tr key={sensor.name}>
                       <th scope="row">{sensor.name}</th>
                       <td>{sensor.model}</td>
                       <td>{this.getDevice(sensor.device)}</td>
					   <td>{sensor.lastUpdated}</td>
					   {this.showState(sensor.type)}
                   </tr>)
               })}
               </tbody>
        }
		
		if (username) {
			pageTitle = <h1>Lista urządzeń</h1>
			formOnSite = <table className="table table-bordered table-hover">
						<thead className="thead-dark">
						<tr>
							<th scope="col">Nazwa</th>
							<th scope="col">Model</th>
							<th scope="col">Urządzenie</th>
							<th scope="col">Aktualizacja</th>
							<th scope="col">Stan</th>
						</tr>
						</thead>
						{sensorTable}
					</table>
			
		} else {
			pageTitle = <div className="alert alert-danger" role="alert">
						<h1>Dostęp tylko dla zalogowanych użytkowników</h1>
						</div>
		}	
			
		return (
			<div className="container">
				{pageTitle}
				{formOnSite}
			</div>
		);
    }

}

export default SensorsLists