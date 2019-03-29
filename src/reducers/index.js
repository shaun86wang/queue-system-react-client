import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { student } from './studentReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  student
});

export default rootReducer;