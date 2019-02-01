import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import routes from "routes/routes.jsx";

import "assets/scss/material-kit-react.css";
import { hot } from "react-hot-loader/root";

var hist = createBrowserHistory();

const App = () => {
    return(
        <Router history={hist}>
    <Switch>
      {routes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>
    )
}

export default hot(App);
