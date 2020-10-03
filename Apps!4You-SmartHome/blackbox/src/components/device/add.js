import React, {Component} from 'react'

// const API = 'http://localhost:5000/api/v1/';
const API = 'http://35.198.90.238:51344/api/v1/';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            userToken: '',
            status: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };


    handleSubmit(event) {
        event.preventDefault();
        if (this.state.deviceName === "") {
            this.setState({
                status: "FAILED",
                message: "Podano nieprawidłową nazwę urządzenia"
            })
        } else {
            fetch(API + 'device', {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                body: JSON.stringify({
                    UserToken: this.state.userToken.trim(),
                    DeviceID: this.state.deviceName.trim(),
                    Event: {
                        Type: "REGISTER",
                        Timestamp: "2020-02-02 02:20:22"
                    }
                })
            })
                .then(handleErrors)
                .then((response) => response.json())
                .then((data) => this.setState({
                    status: data.Status,
                    message: data.Message
                }))
                .catch((data) => {
                    console.log(data);
                    this.setState({
                        status: "FAILED",
                        message: "Nie udało się nawiązać połączenia z serwerem"
                    });
                })
        }
    }

    render() {
        let status;

        if (this.state.status === "SUCCESS") {
            status = <div className="alert alert-success" role="alert">
                {this.state.message}
            </div>
        } else if (this.state.status === "FAILED") {
            status = <div className="alert alert-danger" role="alert">
                {this.state.message}
            </div>
        }
        return (
            <div>
                {status}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="DeviceName">Nazwa urządzenia</label>
                        <input type="text" className="form-control" id="DeviceName" name="deviceName"  aria-describedby="DeviceNameHelp" placeholder="np. Serwer1" onChange={this.changeHandler} />
                        <small id="DeviceNameHelp" className="form-text text-muted">Nazwa pod jaką urządznie będzie później dostęptne w systemie</small>
                        <label htmlFor="DeviceToken">Token urządzenia</label>
                        <input type="text" className="form-control" id="DeviceToken" name="userToken"  aria-describedby="DeviceNameHelp" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={this.changeHandler} />
                        <small id="DeviceTokenHelp" className="form-text text-muted">Token jest do pobrania z strony głównej applikacji <a href="/">Apps!4You</a></small>
                    </div>

                    <button className="btn btn-primary">Dodaj urządzenie</button>
                </form>
            </div>
        );
    }
}

export default AddDevice;
