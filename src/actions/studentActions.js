import {studentConstants} from '../constants'
import {studentService} from '../services'
import { alertActions } from './';
import { history } from '../helpers';

export const studentActions = {
    addStudent
}

function addStudent(email, serviceType, description, phoneNumber){
    return dispatch =>{
        studentService.addStudent(email, serviceType, description, phoneNumber)
        .then(
            res => {
                dispatch(alertActions.success(res));
                setTimeout(()=>{history.push("/asdf"), 3000});
                dispatch({type: studentConstants.ADDSTUDENT_SUCCESS})
            },
            error => {
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
}