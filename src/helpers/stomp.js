import { Stomp } from 'stompjs/lib/stomp.js'
import SockJS from 'sockjs-client'

export const stomp = {
    getStompClient
}

function getStompClient(url){
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);
    return stompClient;
}