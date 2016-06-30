import {Injectable} from '@angular/core';
declare var io: any;

@Injectable()
export class SocketService {

    public socket:any;

    constructor() {
        this.socket = io.connect('http://127.0.0.1:8080');
    }

    public emit (eventName: string, data:any) {
        this.socket.emit(eventName, data);
        console.log("emit", eventName, data);
    }
}