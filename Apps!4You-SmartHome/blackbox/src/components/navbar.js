import React from 'react'

const Navbar = () => {
    return (<div className="App">
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/"><h1>Blackbox</h1></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Urządzenie
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/device/add">Zarejestruj urządzenie urządzenie</a>
                                    <a className="dropdown-item" href="/">Usuń zarejestrowane urządzenie</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Czujniki
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/">Lista czujników</a>
                                    <a className="dropdown-item" href="/">Dodaj czujnik</a>
                                    <a className="dropdown-item" href="/">Usuń czujnik</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <ul className="nav navbar-nav dropleft">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Użytkownik
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Zaloguj</a>
                                <a className="dropdown-item" href="/">Ustawienia</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Wyloguj</a>
                            </div>
                        </li>
                    </ul>
                </nav>

            </header>
        </div>
    );

};

export default Navbar
