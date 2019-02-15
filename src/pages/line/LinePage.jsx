import React from "react";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import { GridContainer, GridItem, Button} from '../../components';

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";



class LinePage extends React.Component {
  render() {
    const { classes} = this.props;
    return (
      <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <h1 className={classes.title}>Estimated Wait Time: 10 minutes</h1>
        <h2>
          2 students in line.
        </h2>
        <br />
        <Button
          color="danger"
          size="lg"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-angle-right" />   Get in line
        </Button>
      </GridItem>
    </GridContainer>
  
        
    );
  }
}
const connectedLinePageWithStyle = withStyles(landingPageStyle)(LinePage);
export {connectedLinePageWithStyle as LinePage}
