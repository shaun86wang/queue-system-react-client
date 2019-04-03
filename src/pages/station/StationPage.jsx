import React from 'react'
import { connect } from 'react-redux';
import config from 'config';
import {stomp} from '../../helpers'


import withStyles from "@material-ui/core/styles/withStyles";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

import { GridContainer, GridItem, Card, CardBody, CardHeader, CardFooter, Button, CustomInput} from '../../components';

import Timer from "@material-ui/icons/Timer";

import {alertActions } from '../../actions'
import { stationServices } from '../../services';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class StationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      open: false,
      student:{
        stationComment:''
      }
    }
  }


  componentDidMount() {
    this.stompClient = stomp.getStompClient(config.websocketUrl);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/clientSocket/getInlineStudents', message => {
        let list = eval(message.body.substr(message.body.indexOf(':') + 1));
        if (list[0] === ''){list = [];}
        this.setState({ students: list });
        
      })
      this.stompClient.send('/getInlineStudents');
    })
  }

  handleGetNextStudent = () => {
    const { dispatch } = this.props;

    stationServices.getNextStudent().then(
      res => {
        this.setState({ student: res });
        this.stompClient.send('/getInlineStudents');
      },
      error => {
        dispatch(alertActions.error(error.toString()));
      }
    )
  }

  handleStudentServedClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleStationCommentChange = (e) => {
    const {value } = e.target;
    const student = {...this.state.student, stationComment:value};
    this.setState({ student});
  }

  handleStudentServedSubmit = () => {
    this.handleClose();
    const { dispatch } = this.props;
    const { student } = this.state;

    stationServices.studentServed(student.id, student.stationComment).then(
      () => {
        this.setState({ student: {stationComment:''} });
        this.stompClient.send('/getInlineStudents');
      },
      error => {
        dispatch(alertActions.error(error.toString()));
      }
    )
  }

  handleStudentAbsent = () => {
    const { dispatch } = this.props;
    const { student } = this.state;

    stationServices.studentAbsent(student.id).then(
      () => {
        this.setState({ student: {stationComment:''} });
        this.stompClient.send('/getInlineStudents');
      },
      error => {
        dispatch(alertActions.error(error.toString()));
      }
    )
  }



  render() {
    const { classes } = this.props;
    const { students, student, open } = this.state;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem sm={12} md={8} lg={6} xl={4}>
            <Card className={classes.textCenter}>
              <CardHeader color="primary" className={classes.cardHeader}>
                {student.studentName ? <h4>Serving Student: {student.displayName}</h4> : <h4>Not Serving Student</h4>}
              </CardHeader>
              {student.studentName ? <CardBody>
                <h4 className={classes.cardTitle}>{student.studentName}</h4>
                <p>Student Number: {student.studentNumber}</p>
                <p>Package Description: {student.description}</p>
              </CardBody> 
              : students.length > 0 && <Button className={classes.nextButton} color="primary" size="lg" onClick={this.handleGetNextStudent}>
                  Get next student
                      </Button>}
              {student.studentName && <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg" onClick={this.handleStudentServedClick}>
                  Student Served
                      </Button>
                <Button simple color="primary" size="lg" onClick={this.handleStudentAbsent}>
                  Student Absent
                      </Button>
              </CardFooter>}
            </Card>
          </GridItem>
        </GridContainer>

        <Card className={classes.lineCard}>
            <CardHeader color="info" className={classes.lineCardHeader}>
              <h4><Timer className={classes.timerIcon} />Line</h4>
            </CardHeader>
            <CardBody className={classes.textCenter}>
              <GridContainer justify="flex-start">
                {students.length > 0 && students.map((s, i) => {
                  return (
                    <GridItem xs={12} sm={3} lg={1} key={i}>
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
        <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Comment on student service</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please type in any note or comment on the student you served.
            </DialogContentText>
              <br></br>
              <CustomInput
                labelText='Comment'
                id='stationComment'

                formControlProps={{
                  fullWidth: true
                }}
                primary
                inputProps={{
                  type: 'text',
                  onChange: this.handleStationCommentChange,
                  required: true,
                  value: student.stationComment
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
            </Button>
              <Button onClick={this.handleStudentServedSubmit} color='primary'>
                Submit
            </Button>
            </DialogActions>
          </Dialog>
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
    marginBottom: "-1vh"
  },
  nextButton: {
    width: '50%',
    margin: 'auto',
    marginBottom: '5vh'
  }
}

function mapStateToProps() {
  return {};
}
const connectedStationPageWithStyle = connect(mapStateToProps)(withStyles(style)(StationPage));
export { connectedStationPageWithStyle as StationPage }
