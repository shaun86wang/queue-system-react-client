import config from 'config';
//import { authHeader } from '../helpers';

export const accountService = {
    login,
    logout,
    signUp,
    getUserDetails
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/account/login`, requestOptions)
        .then(handleResponse)
        .then(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('jwt', res.message);
            localStorage.setItem('email', email);
            return res;
        });
}

function getUserDetails(email){
    return fetch(`${config.apiUrl}/account/getUserDetails/${email}`)
    .then(handleResponse)
    .then(res =>{
        localStorage.setItem('user', JSON.stringify(res));
        return res;
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
}


function signUp(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/account/signup`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}