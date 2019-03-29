import { accountConstants } from '../constants';
import { accountService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const accountActions = {
    login,
    logout,
    signUp
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        accountService.login(username, password)
            .then(
                () => {
                    accountService.getUserDetails(username)
                        .then(user => {
                            console.log(user);
                            dispatch(success(user));
                            history.push('/');
                        })
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: accountConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error } }
}

function logout() {
    accountService.logout();
    return { type: accountConstants.LOGOUT };
}

function signUp(user) {
    return dispatch => {
        dispatch(request(user));
        console.log("Here");
        accountService.signUp(user)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: accountConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.SIGNUP_FAILURE, error } }
}
