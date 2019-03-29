import React from "react";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components

import { title } from "assets/jss/material-kit-react.jsx";



class ErrorPage extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.align}>
                <h1 className={classes.title} >404</h1>
                <h1 className={classes.subTitle}>The page you requested cannot be found</h1>

            </div>


        );
    }
}

const style = {
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none",
        fontSize: '100px'
    },
      subTitle: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    align:{
        textAlign: 'center'
    }
}
const connectedErrorPageWithStyle = withStyles(style)(ErrorPage);
export { connectedErrorPageWithStyle as ErrorPage }
