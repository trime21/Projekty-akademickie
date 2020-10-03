import React, {Component} from 'react'

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    name: "Admin",
                    type: "Administrator",
                    lastLogin: "2020-02-02 02:22:02"
                },
                {
                    name: "User1",
                    type: "Podgląd",
                    lastLogin: "2020-02-02 02:22:02"
                },
                {
                    name: "User2",
                    type: "Podgląd",
                    lastLogin: "2020-02-02 02:22:02"
                },
                {
                    name: "User3",
                    type: "Podgląd",
                    lastLogin: "2020-02-02 02:22:02"
                },
                {
                    name: "User4",
                    type: "Podgląd",
                    lastLogin: "2020-02-02 02:22:02"
                }

            ]
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Użytkownicy</h2>
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nazwa użytkownika</th>
                        <th scope="col">Rola</th>
                        <th scope="col">Ostatnie logowanie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user) => (
                        <tr key={user.name}>
                            <th scope="row">{user.name}</th>
                            <td>{user.type}</td>
                            <td>{user.lastLogin}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default UsersList
