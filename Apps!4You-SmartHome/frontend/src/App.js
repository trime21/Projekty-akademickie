import React, { Component } from 'react';
import Navbar from "./components/navbar";
import DevicesLists from "./components/device/list";
import AddDevice from "./components/device/add";
import EditDevice from "./components/device/edit";
import RemoveDevice from "./components/device/remove";
import SensorsLists from "./components/sensors/list";
import AddSensor from "./components/sensors/add";
import EditSensor from "./components/sensors/edit";
import RemoveSensor from "./components/sensors/remove";
import UsersList from "./components/users/list";
import Home from "./components/home";
import Login from "./components/users/login";
import Logout from "./components/users/logout";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import UsersConfig from "./components/users/config";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        }
    }
  render() {
    return (
        <Router>
          <React.Fragment>
            <Navbar/>
          </React.Fragment>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/device/list" component={DevicesLists} />
		  <Route path="/device/add" component={AddDevice} />
		  <Route path="/device/edit" component={EditDevice} />
		  <Route path="/device/remove" component={RemoveDevice} />
		  <Route path="/sensors/list" component={SensorsLists} />
		  <Route path="/sensors/add" component={AddSensor} />
		  <Route path="/sensors/edit" component={EditSensor} />
		  <Route path="/sensors/remove" component={RemoveSensor} />
          <Route path="/users/list" component={UsersList} />
          <Route path="/users/config" component={UsersConfig} />
          <Route exact path="/login" render={(props) => <Login {...props} username={this.state.username} />} />
          <Route exact path="/logout" render={(props) => <Logout {...props} username={this.state.username} />} />

        </div>
      </Router>
    )
  }
}

export default App;
