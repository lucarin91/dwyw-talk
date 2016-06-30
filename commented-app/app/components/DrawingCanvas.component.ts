// import { Component, Input, ViewChild, ElementRef } from '@angular/core';
// import { Drawing } from '../models';
// import { SocketService } from '../services/SocketService';
// import { LobbyService } from '../services/LobbyService';
// import { DrawingService } from '../services/DrawingService';
// import { UUID } from 'angular2-uuid';

// @Component({
//   selector: 'drawing-canvas',
//   template: `
//     <canvas #drawingCanvas class="canvas" width="400px" height="400px"></canvas>

//     <ion-row>
//       <ion-col>
//         <ion-item>
//           <ion-input #wordInput type="text" placeholder="What it is? "></ion-input>
//         </ion-item>
//       </ion-col>
//       <ion-col center text-right>
//         <button (click)="finishDrawing(wordInput)" secondary>Finish!</button>
//       </ion-col>
//     </ion-row>
//   `
// })
// export class DrawingCanvasComponent {
//   // recuperiamo il canvas attraverso la sua template variable
//   // che è appunto #drawingCanvas
//   @ViewChild("drawingCanvas")
//   drawingCanvas: ElementRef; 
//   canvas: any;
//   drawingUuid: string = UUID.UUID();

//   constructor(public socketService:SocketService, public drawingService:DrawingService, public lobbyService:LobbyService) {}

//   ngAfterViewInit() { // wait for the view to init before using the element
//     var context: CanvasRenderingContext2D = this.drawingCanvas.nativeElement.getContext("2d");

//     var mouse = {
//               click: false,
//               move: false,
//               pos: { x: 0, y: 0 },
//               pos_prev: { x: 0, y: 0 },
//           };

//     this.canvas = this.drawingCanvas.nativeElement;

//     this.canvas.onmousedown = (e) => { mouse.click = true; };
//     this.canvas.onmouseup =  (e) => { mouse.click = false; };
//     this.canvas.onmousemove = (e) => {
//         //http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
//         mouse.pos.x = (e.clientX - (this.canvas.getBoundingClientRect().left - window.pageXOffset)) / this.canvas.width;
//         mouse.pos.y = (e.clientY - (this.canvas.getBoundingClientRect().top - window.pageYOffset)) / this.canvas.height;
//         mouse.move = true;
//     };

//     // draw line received from server
//     this.socketService.socket.on('draw_line', (data) => {

//         var line = data.line;

//         if(data.uuid != this.drawingUuid)
//           return;
        
//         context.beginPath();
//         context.moveTo(line[0].x * this.canvas.width, line[0].y * this.canvas.height);
//         context.lineTo(line[1].x * this.canvas.width, line[1].y * this.canvas.height);

//         context.strokeStyle = "red";
//         context.stroke();
//     });

//     var that = this;

//     // main loop, running every 25ms
//     function drawingLoop() {

//         if (mouse.click && mouse.move) {
//             that.socketService.emit('draw_line', { line: [mouse.pos, mouse.pos_prev], uuid: that.drawingUuid, author: that.lobbyService.currentUser.username});
//             mouse.move = false;
//         }
//         mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };

//         setTimeout(drawingLoop, 25);
//     }

//     drawingLoop();
//   }

//   finishDrawing(wordInput)
//   {
//     if(wordInput.value === undefined || wordInput.value == "")
//       return;
    
//     this.drawingService.finishDrawing(this.drawingUuid, wordInput.value);

//     wordInput.value = "";
//     this.drawingUuid = UUID.UUID();
//     this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }
// }