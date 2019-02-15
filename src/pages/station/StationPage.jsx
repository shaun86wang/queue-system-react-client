import React from 'react'

import withStyles from "@material-ui/core/styles/withStyles";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

import { GridContainer, GridItem, Card, CardBody, CardHeader, CardFooter, Button } from '../../components';

import Timer from "@material-ui/icons/Timer";
class StationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      students: ["SF13", "AS43", "FH58", "SU48", "FJ02"]
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem sm={12} md={4}>
            <Card className={classes.textCenter}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Serving Student: ABCD</h4>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>John Doe</h4>
                <p>Student Number: 20212345</p>
                <p>Package Description: this is a package</p>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg">
                  Student Served
                      </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <Card className={classes.lineCard}>
          <CardHeader color="info" className={classes.lineCardHeader}>
            <h4><Timer className={classes.timerIcon} />       Line</h4>
          </CardHeader>
          <CardBody className={classes.textCenter}>
            <GridContainer justify="flex-start">
              {
                this.state.students.map((s, i) => {
                  return (
                    <GridItem xs={1} key={i}>
                      <Button color="info">
                        {s}
                      </Button>
                    </GridItem>
                  )
                })
              }
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  lineCardHeader: {
    width: "30%",
    textAlign: "center",
    margin: "auto",
    marginTop: "-40px",
    marginBottom: "15px"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  lineCard: {
    textAlign: "center",
    width: "100%",
    marginTop: "10vh"
  },
  timerIcon: { 
    fontSize: 30, 
    marginBottom: "-1vh", 
    marginLeft: "-50px", 
    marginRight: "20px" 
  }
}

export default withStyles(style)(StationPage);
