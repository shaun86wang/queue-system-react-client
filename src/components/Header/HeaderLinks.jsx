/*eslint-disable*/
import React from "react";
import { connect } from 'react-redux';
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import { Button } from "../";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes, user } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>

        {!user && <Button
          color="transparent"
          className={classes.navLink}
          href='/login'
        >
          Login
        </Button>}

        {user &&
          <div>
            Welcome, {user.studentName}
            <Button
              color="transparent"
              className={classes.navLink}
              href='/login'
            >
              Log Out
        </Button>
          </div>
        }
      </ListItem>
    </List>
  );
}
function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  }
}
let connectedHeaderLinkswithStype = connect(mapStateToProps)(withStyles(headerLinksStyle)(HeaderLinks));
export { connectedHeaderLinkswithStype as HeaderLinks };
