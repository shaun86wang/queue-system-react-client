import config from 'config';

export const studentService = {
    addStudent
}

const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

function addStudent(email, serviceType, description) {
    const requestOptions = { ...postRequestOptions, body: JSON.stringify({ email, serviceType, description }) };
    return fetch(`${config.apiUrl}/student/addStudent`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
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