import React, {Component} from 'react'
import logo from './logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        }
    }

    render() {
        let username;
        let loginPage;
        let logoutComponent;
        let menu;
		let configComponent;
		let listComponent;
		let userActions;
        if (localStorage.getItem('username') === null) {
            username = <div>Zaloguj się</div>;
            loginPage = <a className="dropdown-item" href="/login">Zaloguj</a>;
            logoutComponent = <div></div>;
			configComponent = <div></div>;
			listComponent = <div></div>;
            menu = <div />;
			userActions = <div />;
        } else {
            username = <div>{localStorage.getItem('username')}</div>;
            loginPage = <div></div>;
			userActions= <div>
                <a className="dropdown-item" href="/users/config">Ustawienia</a>
                <a className="dropdown-item" href="/users/list">Zarządzanie użytkownikami</a>
                <div className="dropdown-divider" />
            </div>;
            logoutComponent = <a className="dropdown-item" href="/logout">Wyloguj</a>;
			configComponent = <a className="dropdown-item" href="/users/config">Ustawienia</a>;
			listComponent = <a className="dropdown-item" href="/users/list">Zarządzanie użytkownikami</a>;
            menu = <ul className="navbar-nav mr-auto">
               <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Urządzenia
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/device/list">Lista urządzeń</a>
                        <a className="dropdown-item" href="/device/add">Dodaj urządzenie</a>
						<a className="dropdown-item" href="/device/edit">Edytuj urządzenie</a>
                        <a className="dropdown-item" href="/device/remove">Usuń urządzenie</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Czujniki
                    </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/sensors/list">Lista czujników</a>
                    <a className="dropdown-item" href="/sensors/add">Dodaj czujnik</a>
					<a className="dropdown-item" href="/sensors/edit">Edytuj czujnik</a>
                    <a className="dropdown-item" href="/sensors/remove">Usuń czujnik</a>
                </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/">Harmonogram</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Raporty</a>
                </li>
            </ul>
        }
        return (
            <div className="App">
                <header className="App-header">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/"><img src={logo} alt="Logo" height="50" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {menu}
                        </div>

                        <ul className="nav navbar-nav dropleft">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {username}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {loginPage}
									{configComponent}
									{listComponent}
									{logoutComponent}
                                </div>
                            </li>
                        </ul>
                    </nav>

                </header>
            </div>
        );

     }

    }

    export default Navbar