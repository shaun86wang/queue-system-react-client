import {socketConstants} from '../constants'

export const socketActions = {
    socketConnected
}

function socketConnected(stompClient){
    return {type: socketConstants.SOCKET_CONNECTED, stompClient};
}