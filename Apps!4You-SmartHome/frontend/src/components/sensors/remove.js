import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";


class RemoveSensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
			sensors: [],
			sensor: "",
			status: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    componentDidMount() {
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
		this.setState({sensor: event.target.value});
	}
		
    handleSubmit(event) {
		const id = this.state.sensor
		let date = this.getDate()
		
		event.preventDefault();
		
		fetch(API + 'sensor', {
			headers: {'Content-Type': 'application/json'},
			method: "DELETE",
			body: JSON.stringify({
				UserToken: "aaaa-bbbb-cccc-dddd",
				SensorID: id,
				Event: {
                    Type: "REMOVE",
                    Timestamp: date
                }
			})
		})
			.then((response) => response.json())
			.then((data) => this.setState({status: data.Status}))
			.catch((data) => console.log(data))
    }
		
	choseSensor() {
		if (this.state.model === "") {

		} else {
			return(
				<div>
					<label htmlFor="Sensor">Czujnik</label>
					<br />	
					<select value={this.state.sensor} onChange={this.handleChange}>
						<option value="">Wybierz</option>
						{this.state.sensors.map((sensor) => <option value={sensor.id}>{sensor.name}</option>)}
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
		let username = localStorage.getItem('username');
		let pageTitle;
		let formOnSite;
		
        if (this.state.status === "SUCCESS") {
            status = <div className="alert alert-success" role="alert">
                Pomyślnie usunięto czujnik
            </div>
        } else if (this.state.status === "FAILED") {
            status = <div className="alert alert-danger" role="alert">
                Nie można usunąć czujnika
            </div>

        }
		
		if (username) {
			pageTitle = <h1>Wybierz czujnik do usunięcia</h1>
			formOnSite =  <form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<br />									
						{this.choseSensor()}
						<br /> 
					</div>
					<button className="btn btn-primary">Usuń czujnik</button>					
				</form>
			
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

export default RemoveSensor