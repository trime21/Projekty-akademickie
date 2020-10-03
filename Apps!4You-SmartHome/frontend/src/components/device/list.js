import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";

class DevicesLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
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
    }

    deviceStatus = (status) => {
        console.log(status);
        if (status === "Sprawny") {
            return "bg-success"
        } else {
            return "bg-danger"
        }
    };

    render() {
        let deviceTable;
        let tableHeader;
        let pageTitle;
        let username = localStorage.getItem('username');
        if (this.state.devices) {
           deviceTable = <tbody>

               {this.state.devices.map((device) => {
                   return (<tr className={this.deviceStatus(device.state)} key={device.name}>
                       <th scope="row">{device.name}</th>
                       <td>{device.activeSensors}</td>
                       <td>{device.state}</td>
                       <td>{device.lastUpdated}</td>
                   </tr>)
               })}
               </tbody>
        }


        if (username) {
            tableHeader = <thead className="thead-dark">
                <tr>
                    <th scope="col">Nazwa urządzenia</th>
                    <th scope="col">Liczba aktywnych czujników</th>
                    <th scope="col">Status</th>
                    <th scope="col">Najświeższe dane</th>
                </tr>
                </thead>
            pageTitle = <h1>Lista urządzeń</h1>
        } else {
            pageTitle = <h1>Dostęp tylko dla zalogowanych użytkowników</h1>
        }

        return (
            <div className="container">
                {pageTitle}
                <table className="table table-bordered table-hover">
                    {tableHeader}
                    {deviceTable}
                </table>
            </div>

        );

    }
}

export default DevicesLists
