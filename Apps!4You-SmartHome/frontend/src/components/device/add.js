import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";


class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            deviceToken: '',
            answer: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        if (!username) {
        }
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    handleSubmit(event) {
		const deviceName = this.state.deviceName
        event.preventDefault();
		let date = this.getDate();
		
        fetch(API + 'device', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
                UserToken: "aaaa-bbbb-cccc-dddd",
                DeviceName: deviceName,
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
        let info;
		let status;
        if (this.state.answer.Status === "SUCCESS") {
            status = <div className="alert alert-success" role="alert">
                {this.state.answer.Message}
            </div>
        } else if (this.state.answer.Status === "FAILED") {
            status = <div className="alert alert-danger" role="alert">
				{this.state.answer.Message}
            </div>
        }
        return (
            <div className="container">
                {info}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="DeviceName">Nazwa urządzenia</label>
                        <input type="text" className="form-control" id="DeviceName" name="deviceName"  aria-describedby="DeviceNameHelp" placeholder="np. Serwer1" onChange={this.changeHandler} />
                        <small id="DeviceNameHelp" className="form-text text-muted">Nazwa pod jaką urządznie będzie później dostęptne w systemie</small>
                        <label htmlFor="DeviceToken">XXXX-XXXX-XXXX-XXXX</label>
                        <input type="text" className="form-control" id="DeviceToken" name="deviceToken"  aria-describedby="DeviceNameHelp" placeholder="np. Serwer1" onChange={this.changeHandler} />
                        <small id="DeviceTokenHelp" className="form-text text-muted">Token urządzenia</small>
                    </div>

                    <button className="btn btn-primary">Dodaj urządzenie</button>
                </form>
                {status}
            </div>
        );
    }
}

export default AddDevice;
