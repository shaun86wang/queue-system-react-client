import React from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import {GridContainer, GridItem, Button, Card, CardBody, CardHeader, CardFooter, CustomInput} from '../../components';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx';


class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      firstName: '',
      lastName: '',
      password: '',
      confirm: '',
      studentNumber:'',
      email:''
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
  }

  handleChange = (e) =>{
    const {id, value} = e.target;
    this.setState({[id]: value});
  }

  render() {
    const { classes} = this.props;
    return (
      <GridContainer justify='center'>
      <GridItem xs={12} sm={12} md={4}>
        <Card className={classes[this.state.cardAnimaton]}>
          <form className={classes.form}>
            <CardHeader color='primary' className={classes.cardHeader}>
              <h4>Register</h4>
              </CardHeader>
            <CardBody>
              <CustomInput
                labelText='Email...'
                id='email'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'email',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
              <CustomInput
                labelText='Password'
                id='password'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'password',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                      </Icon>
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
              <CustomInput
                labelText='Confirm Password'
                id='confirm'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'password',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                      </Icon>
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
              <CustomInput
                labelText='First Name'
                id='firstName'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon className={classes.inputIconsColor}>
                      perm_identity
                      </Icon>
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
              <CustomInput
                labelText='Last Name'
                id='lastName'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon className={classes.inputIconsColor}>
                      perm_identity
                      </Icon>
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
              <CustomInput
                labelText='Student Number'
                id='studentNumber'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon className={classes.inputIconsColor}>
                        assignment_ind
                      </Icon>
                    </InputAdornment>
                  ),
                  onChange:this.handleChange,
                  required: true
                }}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button simple color='primary' size='lg'>
                Register
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
    );
  }
}
function mapStateToProps(state){
  const {registering}  = state.registration;
  return{
    registering
  }
}

const connectedSignUpPageWithStyle = connect(mapStateToProps)(withStyles(loginPageStyle)(SignUpPage));
export {connectedSignUpPageWithStyle as SignUpPage}
