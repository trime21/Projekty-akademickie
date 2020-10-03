import React, {Component} from 'react'

class UsersConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "aaaa-bbbb-cccc-dddd"
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Ustawienia użytkownika</h1>
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nzwa parameteru</th>
                        <th scope="col">Wartość</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Token użytkownika</td>
                        <td>{this.state.token}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default UsersConfig
