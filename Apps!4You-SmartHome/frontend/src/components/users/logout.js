import React, {Component} from 'react'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            status: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({login: localStorage.getItem('username')});
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.setState({login: null});
        window.location.reload();
    }

    render() {
        let message;
        if (this.state.login) {
           message = <div>
               <h1>Czy na pewno chcesz się wylogować?</h1>
              <button className="btn btn-primary">Wyloguj</button>
           </div>
        }
        else {
            message = <h1>Pozmyślnie wylogowano użytkownika</h1>
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    {message}
                </form>
            </div>
        )
    }
}

export default Logout;
