import config from 'config';

export const studentService = {
    addStudent,
    getWaitingStudentsCount,
    getStudentInfo,
    updateDescription,
    cancelStudent,
    getWaitAheadForStudent
}

const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

function addStudent(email, serviceType, description, phoneNumber) {
    const requestOptions = { ...postRequestOptions, body: JSON.stringify({ email, serviceType, description, phoneNumber }) };
    return fetch(`${config.apiUrl}/student/addStudent`, requestOptions)
        .then(handleResponse);
}

function getWaitingStudentsCount(){
    return fetch(`${config.apiUrl}/student/getWaitingStudentsCount`).then(handleResponse);
}

function getStudentInfo(email){
    return fetch(`${config.apiUrl}/student/getStudentInfo/${email}`).then(handleResponse);
}

function updateDescription(id, description){
    const requestOptions = { ...postRequestOptions, body: JSON.stringify({ id,  description }) };
    return fetch(`${config.apiUrl}/student/updateDescription`, requestOptions)
        .then(handleResponse);
}

function cancelStudent(id){
    return fetch(`${config.apiUrl}/student/cancelStudent/${id}`, {method:'PUT'})
    .then(handleResponse);

}

function getWaitAheadForStudent(id){
    return fetch(`${config.apiUrl}/student/getWaitAheadForStudent/${id}`).then(handleResponse);
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