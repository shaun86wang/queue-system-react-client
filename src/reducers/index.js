import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { student } from './studentReducer';
import { socket } from './socketReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  student,
  socket
});

export default rootReducer;