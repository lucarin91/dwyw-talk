import {Injectable, NgZone} from '@angular/core';
import {SocketService} from './SocketService';
import {LobbyService} from './LobbyService';
import {Drawing, Line} from '../models';

@Injectable()
export class DrawingService {

    drawings:Drawing[] = [];

    //non ci importa assai di enableLongStackTrace, è un parametro
    //che si imposta a false negli ambienti di produzione perchè 
    //può peggiorare le performance
    private zone = new NgZone({enableLongStackTrace: false});

    private findDrawing(uuid:string)
    {
        for(let d of this.drawings)
            if(d.uuid == uuid)
                return d;

        return null;
    }

    constructor(private socketService:SocketService, private lobbyService:LobbyService) {
        
        console.log("creato drawingService");

        socketService.socket.on('new_drawing', (data) => {
            this.zone.run(() => {

                let drawing = new Drawing(data.uuid, 
                                          this.lobbyService.findUser(data.author), 
                                          data.is_guested, data.is_finished);

                this.drawings.unshift(drawing);
            });

            console.log("new_drawing");
        });

        socketService.socket.on('draw_line', (data) => {
        
            console.log("draw_line");

            this.zone.run(() => {
                let drawing = this.findDrawing(data.uuid);

                let line = data.line;
                drawing.addLine(new Line(line[0].x*100 + "%",
                                        line[0].y*100 + "%",
                                        line[1].x*100 + "%",
                                        line[1].y*100 + "%"));
            });
        });
    }
}