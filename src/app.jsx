import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import {StationPage, LoginPage, SignUpPage, LinePage, ErrorPage, WaitPage} from './pages'
import { history } from './helpers';

import { alertActions } from './actions';

import { Header, HeaderLinks, SnackbarContent, ClearFix, Footer} from './components'


import "assets/scss/material-kit-react.css";
import { hot } from "react-hot-loader/root";
import withStyles from "@material-ui/core/styles/withStyles";
import { container } from "assets/jss/material-kit-react.jsx";

import img from "assets/img/bg3.jpg";


class App extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props;
    history.listen(() => {
      dispatch(alertActions.clear());
    });
  }
  render() {
    const { classes, alert } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Live Kue"
          rightLinks={<HeaderLinks />}
        />

        <div
          className={classes.pageHeader}
        >
          <div className={classes.container}>
            {alert.message && <div className={classes.paddingBottom}>
              <SnackbarContent message={alert.message} close color={alert.type} icon={alert.icon}></SnackbarContent>
            </div>}
            <ClearFix />
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={LinePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signUp" component={SignUpPage} />
                <Route path="/wait" component={WaitPage} />
                <Route path="/station" component={StationPage} />
                <Route component={ErrorPage} />
              </Switch>
            </Router>
            <Footer></Footer>
          </div>

        </div>
      </div>
    )
  }
}

const style = {
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
    backgroundImage: "url(" + img + ")",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundAttachment: "fixed"
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "20vh",
    minHeight: "90vh"
  },
  paddingBottom: {
    paddingBottom: "10vh"
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}
const connectedApp = connect(mapStateToProps)(App);
const appWithStyles = withStyles(style)(connectedApp);
export default hot(appWithStyles);
