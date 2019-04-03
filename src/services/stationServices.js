import config from 'config';


export const stationServices = {
    getNextStudent,
    studentServed,
    studentAbsent
}
const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

function getNextStudent(){
    return fetch(`${config.apiUrl}/station/getNextStudent`).then(handleResponse);
}

function studentServed(id, comment){
    const requestOptions = {...postRequestOptions, body: JSON.stringify({id, comment})};
    return fetch(`${config.apiUrl}/station/studentServed`, requestOptions).then(handleResponse);
}

function studentAbsent(id){
    return fetch(`${config.apiUrl}/station/studentNotHere/${id}`, postRequestOptions).then(handleResponse);
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