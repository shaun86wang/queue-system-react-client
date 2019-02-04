import React from 'react'

import withStyles from "@material-ui/core/styles/withStyles";

import { cardTitle, container } from "assets/jss/material-kit-react.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Timer from "@material-ui/icons/Timer";
import img from "assets/img/bg3.jpg";
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
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + img + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
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
          
          <Card style={{width:"100%", marginTop:"10vh"}} className={classes.textCenter}>
          <CardHeader color="info" className={classes.lineCardHeader}>
          <h4><Timer style={{ fontSize: 30, marginBottom:"-1vh", marginLeft:"-50px", marginRight:"20px"}}/>       Line</h4>
          </CardHeader>
          <CardBody className={classes.textCenter}>
          <GridContainer justify="flex-start">
          {
            this.state.students.map((s, i)=>{
              return(
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
      </div>

    )
  }
}

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
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
      background: "rgba(0, 0, 0, 0.5)"
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
    }
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
    margin:"auto",
    marginTop: "-40px",
    marginBottom: "15px"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF"
  }
}

export default withStyles(style)(StationPage);
