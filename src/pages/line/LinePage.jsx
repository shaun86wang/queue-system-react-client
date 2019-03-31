import React from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { alertActions } from '../../actions'

import { history } from '../../helpers'

import { studentService } from '../../services'

// core components
import { GridContainer, GridItem, Button, CustomInput } from '../../components';

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class LinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: 0,
      description: ''
    }
  }

  componentDidMount() {
    studentService.getWaitingStudentsCount().then(count => { this.setState({ count }); });
  }
  handleClickOpen = () => {
    if (this.props.user) {
      this.setState({ open: true });

    } else {
      history.push('./login');
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSelectChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    this.handleClose();
    const { user, dispatch } = this.props;
    const {type, description} = this.state;
    studentService.addStudent(user.email, type, description)
      .then(
        res => {
          dispatch(alertActions.success(res.message));
          setTimeout(() => { history.push("/wait");}, 2000 );
        },
        error => {
          dispatch(alertActions.error(error.toString()));
        }
      );
  }

  render() {
    const { classes } = this.props;
    const { count, open, type, description } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <h1 className={classes.title}>Estimated Wait Time: 10 minutes</h1>
          {count && <h2>
            {count} students in line.
        </h2>}
          <br />
          <Button
            color="danger"
            size="lg"
            onClick={this.handleClickOpen}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-angle-right" />   Get in line
        </Button>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Get in line</DialogTitle>
            <DialogContent>
              <DialogContentText>
                In order to get in line, please decribe the type of package you are retrieving.
            </DialogContentText>
              <br></br>
              <FormControl required style={{ width: '100%' }}>
                <InputLabel htmlFor="type">Service Type</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleSelectChange}
                  name="type"
                  inputProps={{
                    id: 'type',
                  }}
                  color="error"
                >
                  <MenuItem value={0}>Retrieve Package</MenuItem>
                  <MenuItem value={1}>Send Package</MenuItem>
                  <MenuItem value={2}>Other Services</MenuItem>
                </Select>
              </FormControl>
              <CustomInput
                labelText='Description*'
                id='description'

                formControlProps={{
                  fullWidth: true
                }}
                error
                inputProps={{
                  type: 'text',
                  onChange: this.handleChange,
                  required: true,
                  value: description
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="danger">
                Cancel
            </Button>
              {description && <Button onClick={this.handleSubmit} color="danger">
                Submit
            </Button>}
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>


    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return { user };
}


const connectedLinePageWithStyle = connect(mapStateToProps)(withStyles(landingPageStyle)(LinePage));
export { connectedLinePageWithStyle as LinePage }
