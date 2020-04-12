import React from "react";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";

import Home from "./components/home";
import Display from "./components/display";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/display" component={Display} />
        <Route path="/logout" component={Logout} />
      </Router>
    </div>
  );
}

export default App;
