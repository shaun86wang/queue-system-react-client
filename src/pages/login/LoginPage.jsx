import React from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import {  GridContainer, GridItem, Button, Card, CardBody, CardHeader, CardFooter, CustomInput } from '../../components';

import {history} from '../../helpers'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx';

import {accountActions} from '../../actions'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.props.dispatch(accountActions.logout());
    this.state = {
      cardAnimaton: 'cardHidden',
      email: '',
      password: ''
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
  }

  handleChange = (e) =>{
    const {id, value} = e.target;
    this.setState({[id]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    const {email, password} = this.state;
    //TODO: Add email validation
    if(email && password){
      this.props.dispatch(accountActions.login(email, password));
    }
  }

  handleRegister = () => {
    history.push("/signUp");
  }
  render() {
    const { classes } = this.props;

    return (
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[this.state.cardAnimaton]}>
            <form className={classes.form} >
              <CardHeader color='primary' className={classes.cardHeader}>
                <h4>Login</h4>
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
                  id='pass'
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
                    id:'password',
                    onChange:this.handleChange,
                    required: true
                  }}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color='primary' size='lg' onClick={this.handleSubmit}>
                  Submit
                      </Button>
              </CardFooter>
              <Button block={true} link={true} color='primary' size='sm' type='button' onClick={this.handleRegister} >Do not have an account? Register here!</Button>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
function mapStateToProps(state){
  const {loggingIn} = state.authentication;
  return {loggingIn};
}

const connectedLoginPageWithStyles = connect(mapStateToProps)(withStyles(loginPageStyle)(LoginPage));
export {connectedLoginPageWithStyles as LoginPage}
