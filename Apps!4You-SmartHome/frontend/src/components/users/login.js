import React, {Component} from 'react'

const API = "http://localhost:5000/api/v1";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
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
        console.log(localStorage.getItem('token'));
        fetch(API + 'login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                login: this.state.login.trim(),
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.Token) {
                    localStorage.setItem('token', data.Token);
                    localStorage.setItem('username', this.state.login);
                    this.setState({
                        status: data.Status
                    });
                    alert("Pomyślnie zalogowano użytkownika");
                    window.location.reload();
                }
                this.setState({
                    status: data.Status
                });
            })
            .catch((data) => console.log(data));
    }

    render() {
        let status;
        if (this.state.status === "AUTHORIZED") {
            status = <div className="alert alert-success" role="alert">
                Pomyślnie zalogowano użytownika
            </div>
        } else if (this.state.status === "NOT_AUTHORIZED") {
            status = <div className="alert alert-danger" role="alert">
                Nieprawidłowa nazwa użytkownika lub hasło
            </div>
        }
        return(
            <div className="container">
                <h1>Logowanie użytkownika</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="UserLogin">Nazwa Użytkownika</label>
                        <input type="text" className="form-control" id="UserLogin" name="login" aria-describedby="Nazwa pod jaką został zarajestrowany użytkownik" placeholder="Login" onChange={this.changeHandler} />
                        <label htmlFor="UserPassword">Hało</label>
                        <input type="password" className="form-control" id="UserPassword" name="password" aria-describedby="Hasło podane podczas rejestracji" placeholder="*****" onChange={this.changeHandler} />
                    </div>
                    <button className="btn btn-primary">Zaloguj</button>
                </form>
                {status}
            </div>
        )
    }
}

export default Login;