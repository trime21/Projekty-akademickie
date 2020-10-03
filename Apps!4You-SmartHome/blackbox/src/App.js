import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Navbar from "./components/navbar";
import Home from "./components/home";
import AddDevice from "./components/device/add";

function App() {
  return (
      <div>
          <React.Fragment>
              <Navbar />
          </React.Fragment>
          <Router>
              <div className="container">
                  <Route exact path="/" component={Home} />
                  <Route path="/device/add" component={AddDevice} />
              </div>
          </Router>
      </div>
  );
}

export default App;
