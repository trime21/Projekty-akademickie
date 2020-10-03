import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";


class EditDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
			devices: [],
			deviceID: "",
			deviceName: "",
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
    }
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		
		const setName = (name === "deviceID") ? this.getDevice(value).name : value;

		this.setState({
			[name]: value,
			deviceName: setName
		});
	}
	
	getDevice(id) {
		for (let i = 0; i < this.state.devices.length; i++){
			if (this.state.devices[i].id == id){
				return this.state.devices[i];
			}
		}
	}
	
    handleSubmit(event) {
		let id = this.state.deviceID
		let name = this.state.deviceName
		let date = this.getDate()
		
        event.preventDefault();
		
        fetch(API + 'device', {
            headers: {'Content-Type': 'application/json'},
            method: "PATCH",
            body: JSON.stringify({
                UserToken: "aaaa-bbbb-cccc-dddd",
				DeviceID: id,
				DeviceName: name,
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
	
	choseDevice() {
		return(
			<div>
				<select name="deviceID" value={this.state.deviceID} onChange={this.handleInputChange}>
					<option value="">Wybierz</option>
					{this.state.devices.map((device) => <option value={device.id}>{device.name}</option>)}
				</select>
			</div>
		);		
	}	
	
	moreInfo(){
		return(
			<div>
				<input type="text" className="form-control" name="deviceName" value={this.state.deviceName} aria-describedby="DeviceNameHelp" onChange={this.handleInputChange}/>
				<small id="DeviceNameHelp" className="form-text text-muted">Nazwa pod jaką urządznie będzie później dostęptne w systemie</small>
			</div>	
		);	
	}
	
	submitData(){
		if (this.state.sensorName === "" || this.state.model === "") {

		} else {
			return(
				<button className="btn btn-primary">Zaaktualizuj urządzenie</button>
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
								<label htmlFor="Device">Urządzenie</label>
								<br />
								{this.choseDevice()}
							</td>
							<td>
								<label htmlFor="DeviceName">Nazwa</label>
								<br />
								{this.moreInfo()}
							</td>
						</tr>
					</table>						
					{this.submitData()}					
				</form>
			pageTitle = <h1>Edytuj urządzenie</h1>
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

export default EditDevice