import { socketConstants } from '../constants'

export function socket(state = {}, action) {
    switch (action.type) {
        case socketConstants.SOCKET_CONNECTED:
            return {
                stompClient: action.stompClient
            }
        default:
            return state;
    }
}