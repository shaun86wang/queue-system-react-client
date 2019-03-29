import { studentConstants } from '../constants'
export function student(state = {}, action) {
    switch (action.type) {
        case studentConstants.ADDSTUDENT_SUCCESS:
            return { inLine: true };
        default:
            return state
    }
}