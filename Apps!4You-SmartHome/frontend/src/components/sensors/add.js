import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";



class AddSensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
			type: "",
			model: "",
			sensorName: "",
			devices: [],
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
    }
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const valueModel = (target.name === "type") ? "" : (target.name === "model") ? target.value : this.state.model;
		const valueName = (target.name === "model" || target.name === "type") ? "" : (target.name === "sensorTime") ? this.state.sensorName : target.value;

		this.setState({
			[name]: value,
			model: valueModel,
			sensorName: valueName
		});
	}
		
    handleSubmit(event) {
		let name = this.state.sensorName
		let type = this.state.type
		let model = this.state.model
		let device = this.state.device
		let time = this.state.sensorTime
		let date = this.getDate()
		
		
        event.preventDefault();
		
        fetch(API + 'sensor', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
                UserToken: "aaaa-bbbb-cccc-dddd",
				SensorName: name,
				SensorType: type,
				SensorModel: model,
				SensorDevice: device,
				SensorTime: time,
                Event: {
                    Type: "REGISTER",
                    Timestamp: date
                }
            })
        })
            .then((response) => response.json())
            .then((data) => this.setState({answer: data}))
            .catch((data) => console.log(data))
			
    }
	
	typeSwitch(param) {
		switch(param) {
			case 'open':
				return this.open();
			case 'light':
				return this.light();
			case 'temperature':
				return this.temperature();
			case 'humidity':
				return this.humidity();
			case 'pressure':
				return this.pressure();
			case 'alarm':
				return this.alarm();	
			default:
				return this.none();
		}
	}
	
	choseType() {
		return (
			<select name="type" value={this.state.type} onChange={this.handleInputChange}>
				<option value="">Wybierz</option>
				<option value="open">Otwartych okien/drzwi</option>
				<option value="light">Światła</option>
				<option value="temperature">Temperatury</option>
				<option value="humidity">Wilgotności</option>
				<option value="pressure">Ciśnienia</option>
				<option value="alarm">Alarmy</option>
			</select>
		);	
	}
  
	choseModel() {
		return( 
			<div>
				{this.typeSwitch(this.state.type)}
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
			<div className="container">
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
				<button className="btn btn-primary">Dodaj czujnik</button>
			);
		}	
	}
	
	none() {
		return (
			<select name="model" value={this.state.model} onChange={this.handleInputChange}>
				<option value="">Wybierz</option>
			</select>
		);
	}
	
	open() {
		return (
			<select name="model" value={this.state.model} onChange={this.handleInputChange}>
				<option value="">Wybierz</option>
				<option value="HSM02 Z-Wave">Everspring HSM02 Z-Wave</option>
				<option value="NAS-DS01W">Neo NAS-DS01W</option>
				<option value="SW600">Salus SW600</option>
				<option value="Aqara Zigbee">Xiaomi Aqara Zigbee</option>
			</select>
		);
	}
	
	light() {
		return (<select name="model" value={this.state.model} onChange={this.handleInputChange}>
			<option value="">Wybierz</option>
			<option value="LM358">Grove LM358</option>
			<option value="LS06-S">Grove LS06-S</option>			
			<option value="PDS-9002">Grove PDS-9002</option>
			<option value="Si1145">Grove SI1145</option>			
			<option value="SFH7776">Osram SFH7776</option>
			<option value="TCS3200">Waveshare TCS3200</option>
			<option value="TSL2581FN">Waveshare TSL2581FN</option>
			<option value="SEE-09667">Xadow Basic Sensor</option>
		</select>);
	}
	
	temperature() {
		return (<select name="model" value={this.state.model} onChange={this.handleInputChange}>
			<option value="">Wybierz</option>
			<option value="DHT11">DHT11</option>			
			<option value="DHT21">DHT21</option>			
			<option value="DHT22">DHT22</option>
			<option value="DS18B20">DS18B20</option>
			<option value="BME280">Grove BME280</option>
			<option value="TH02">Grove TH02</option>
			<option value="TMP102">SparkFun TMP102</option>
		</select>);
	}

	humidity() {
		return (<select name="model" value={this.state.model} onChange={this.handleInputChange}>
			<option value="">Wybierz</option>
			<option value="DHT11">DHT11</option>			
			<option value="DHT21">DHT21</option>			
			<option value="DHT22">DHT22</option>
			<option value="BME280">Grove BME280</option>
			<option value="TH02">Grove TH02</option>
		</select>);
	}	
  
	pressure() {
		return (<select name="model" value={this.state.model} onChange={this.handleInputChange}>
			<option value="">Wybierz</option>
			<option value="BME280">Czujnik ciśnienia BME280</option>			
			<option value="MPL3115A2">Czujnik ciśnienia MPL3115A2</option>
		</select>);
	}

	alarm() {
		return (<select name="model" value={this.state.model} onChange={this.handleInputChange}>
			<option value="">Wybierz</option>
			<option value="XD10">Czujnik dymu XD10</option>
			<option value="9521">Czujnik płomieni Waveshare 9521</option>
			<option value="7DCO">Czujnik tlenku węgla KIDDE 7DCO</option>			
			<option value="SEN-12642">Detektor dźwięku SparkFun SEN-12642</option>
		</select>);
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
							<td width="15%">
								<label htmlFor="Type"> Typ czujnika</label>
								<br />
								{this.choseType()}
							</td>
							<td width="30%">
								<label htmlFor="Sensor">Czujnik</label>
								<br />
								{this.choseModel()}
							</td>
							<td width="25%">
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
			pageTitle = <h1>Dodaj czujnik</h1>
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

export default AddSensor