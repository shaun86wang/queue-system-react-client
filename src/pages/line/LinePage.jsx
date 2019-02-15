import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import {Footer, GridContainer, GridItem, Button} from '../../components';

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import img from "assets/img/landing-bg.jpg";



class LinePage extends React.Component {
  render() {
    const { classes} = this.props;
    return (
        <div className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + img + ")",
            backgroundSize: "cover",
            height: "100%",
            backgroundPosition: "top center"
          }}>
          <div className={classes.container}>
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
          </div>

        <Footer whiteFont/>
        </div>
        
    );
  }
}

export default withStyles(landingPageStyle)(LinePage);
