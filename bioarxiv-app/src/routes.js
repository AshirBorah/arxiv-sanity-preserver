import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
/**
 * Import all page components here
 */
// import App from './App';
// import MainPage from './MainPage';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import App from "./App";
import { Switch } from "@material-ui/core";
/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Router>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/main" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </Router>
);
