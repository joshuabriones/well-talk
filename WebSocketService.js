import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
    constructor() {
        this.socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(this.socket);
    }

    connect(callback) {
        this.stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/messages', message => {
                callback(JSON.parse(message.body));
                console.log(message);
            });
        });
    }

    sendMessage(message) {
        this.stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
    }

    disconnect() {
        if (this.stompClient !== null && this.connected) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected');
                this.connected = false;
            });
            console.log('Disconnected');
        }
    }
}
export default new WebSocketService();
