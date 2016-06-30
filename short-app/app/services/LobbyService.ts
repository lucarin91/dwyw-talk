import {Injectable, NgZone} from '@angular/core';
import {SocketService} from './SocketService';
import { UUID } from 'angular2-uuid';
import { User } from '../models';

@Injectable()
export class LobbyService {

    //non ci importa molto di enableLongStackTrace, è un parametro
    //che si imposta a false negli ambienti di produzione perchè 
    //può peggiorare le performance
    private zone = new NgZone({enableLongStackTrace: false});

    public userList:User[] = [];
    public currentUser:User = null;

    public findUser(username:string)
    {
        for(let u of this.userList)
            if(u.username == username)
                return u;

        return null;
    }

    constructor(private socketService:SocketService) {
        console.log("creato lobbyService");

        //Quando ricevo la lista degli utenti la salvo...
        socketService.socket.on('users_list', (data) => {

            this.zone.run(() => {
                this.userList.length = 0; //trucco per svuotare un array senza crearne uno nuovo
                for (var username in data) {
                    var user = data[username];
                    this.userList.push(new User(user.username, user.points, user.avatar, user.avatar_color));
                }

                //ordino gli utenti in base al loro punteggio
                this.userList.sort(function(u1, u2) {
                    return u2.points-u1.points;
                });
            });

            console.log("received users_list");
        });

        this.socketService.socket.on('login_success', (data) => {
            this.zone.run(() => {
                this.currentUser = new User(data.username, 0, data.avatar, data.avatar_color);
            });
        });
    }

    public login(username:string) {
        this.socketService.emit('login', { username: username, avatar: 'beer', avatar_color: 'red' });
    }
}