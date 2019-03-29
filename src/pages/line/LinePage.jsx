import React from "react";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import { GridContainer, GridItem, Button, CustomInput } from '../../components';

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    const { classes } = this.props;
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
            onClick={this.handleClickOpen}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-angle-right" />   Get in line
        </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Get in line</DialogTitle>
            <DialogContent>
              <DialogContentText>
                In order to get in line, please decribe the type of package you are retrieving.
            </DialogContentText>
              <CustomInput
                labelText='Description'
                id='description'
                formControlProps={{
                  fullWidth: true
                }}
                error
                inputProps={{
                  type: 'text',
                  onChange: this.handleChange,
                  required: true
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="danger">
                Cancel
            </Button>
              {this.state.description && <Button onClick={this.handleClose} color="danger">
                Submit
            </Button>}
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>


    );
  }
}
const connectedLinePageWithStyle = withStyles(landingPageStyle)(LinePage);
export { connectedLinePageWithStyle as LinePage }
