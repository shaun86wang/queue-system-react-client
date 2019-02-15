import { alertConstants } from '../constants';
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        icon: Check,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'danger',
        icon: Warning,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}