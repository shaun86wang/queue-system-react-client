import React from 'react';
import { connect } from 'react-redux';
import config from 'config';

import withStyles from "@material-ui/core/styles/withStyles";

import { GridContainer, GridItem, Card, CardBody, CardHeader, CardFooter, Button, CustomInput } from '../../components';

import { title } from "assets/jss/material-kit-react.jsx";
import { studentService } from '../../services';
import { stomp, history } from '../../helpers'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { alertActions } from '../../actions';


class WaitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, serviceType: 0, loading: true };
        this.stompClient = stomp.getStompClient(config.websocketUrl);
    }
    componentDidMount() {
        if (!this.props.user) {
            history.push('/');
        } else {
            studentService.getStudentInfo(this.props.user.email)
                .then(info => {
                    this.setState({ ...info });
                    if (this.state.status !== 'INLINE' && this.state.status !== 'WAITING') { history.push('/'); }
                    else {
                        studentService.getWaitAheadForStudent(this.state.id).then(count => { this.setState({ count }); });
                        this.setState({ oldDescription: this.state.description });
                        this.setState({ loading: false });
                        this.stompClient.connect({}, () => {
                            this.stompClient.subscribe('/clientSocket/getInlineStudents', () => {
                                studentService.getStudentInfo(this.props.user.email).then(info => {
                                    this.setState({ ...info });
                                    if (this.state.status !== 'INLINE' && this.state.status !== 'WAITING') { history.push('/'); }
                                    else {
                                        studentService.getWaitAheadForStudent(this.state.id)
                                            .then(count => { this.setState({ count }); })
                                    }
                                });

                            });
                        });

                    }
                });
        }

    }

    handleLeave = () => {
        const { dispatch } = this.props;
        studentService.cancelStudent(this.state.id).then(
            res => {
                dispatch(alertActions.success(res.message));
                setTimeout(() => {
                    this.stompClient.send('/getInlineStudents');
                }, 1000);
            },
            error => {
                dispatch(alertActions.error(error));
            }
        )
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleCancel = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        const { description, id } = this.state;
        studentService.updateDescription(id, description)
            .then(res => {
                this.setState({ oldDescription: res.message, description: res.message });
                this.handleCancel()
            });
    }

    render() {
        const { classes } = this.props;
        const { count, displayName, oldDescription, description, serviceType, open, status, loading } = this.state;
        return (
            <GridContainer justify='center'>
                {!loading &&
                    <GridItem sm={12} md={6}>
                        {status == 'WAITING' ? <h1 className={classes.title}>It is your turn!</h1>
                            :
                            <Card className={classes.textCenter}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    {count > 0 ? <h3 className={classes.title}>You have {count} students in front of you</h3> : <h3 className={classes.title}>You are next</h3>}
                                </CardHeader>
                                <CardBody>
                                    <h4>Estimated wait time is {count*10} mins</h4>
                                    <h4>Your ticket code is {displayName}</h4>
                                    <h4>Your service description is: {oldDescription} </h4>

                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button color='primary' size='lg' onClick={this.handleClickOpen}>Update Description</Button>
                                    <Button simple color='primary' size='lg' onClick={this.handleLeave}>
                                        Leave Line
                            </Button></CardFooter>
                            </Card>}
                        <Dialog
                            open={open}
                            onClose={this.handleCancel}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Get in line</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    In order to get in line, please decribe the type of package you are retrieving.
            </DialogContentText>
                                <br></br>
                                <FormControl required style={{ width: '100%' }}>
                                    <InputLabel htmlFor="serviceType">Service Type</InputLabel>
                                    <Select
                                        value={serviceType}
                                        name="serviceType"
                                        readOnly
                                        inputProps={{
                                            id: 'serviceType',
                                        }}
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
                                    inputProps={{
                                        type: 'text',
                                        onChange: this.handleChange,
                                        required: true,
                                        value: description,
                                        autoFocus: true
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancel} color="primary" >
                                    Cancel
            </Button>
                                {oldDescription !== description && <Button onClick={this.handleSubmit} color="primary">
                                    Submit
            </Button>}
                            </DialogActions>
                        </Dialog>

                    </GridItem>
                }
            </GridContainer>
        )
    }
}

const style = {
    textCenter: {
        textAlign: 'center'
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
    cardFooter: {
        paddingTop: "0rem",
        border: "0",
        borderRadius: "6px",
        justifyContent: "center !important"
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return { user };
}

const connectedWaitPageWithStyle = connect(mapStateToProps)(withStyles(style)(WaitPage));
export { connectedWaitPageWithStyle as WaitPage }