// import { Component, Input } from '@angular/core';
// import { Drawing } from '../models';
// import { DrawingService } from '../services/DrawingService';
// import {NavController} from 'ionic-angular';

// @Component({
//   selector: 'drawing-list',
//   directives: [],
//   inputs: ['drawingList'],
//   providers: [],
//   template: `
//     <div *ngIf="drawings.length == 0" style="text-align: center;">
//         <ion-icon class="empty-icon" name="ios-images-outline"></ion-icon>
//         <h2>Non ci sono disegni, inizia a disegnare ora!</h2>
//     </div>
    
//     <ion-card [ngClass]="{'drawing-guessed': drawing.is_guessed, 'not-so-visible': !drawing.is_finished}" *ngFor="let drawing of drawings">
//       <ion-item>
//         <ion-avatar item-left>
//           <ion-icon [style.color]="drawing.author.avatar_color" class="avatar-icon" [name]="drawing.author.avatar"></ion-icon>
//         </ion-avatar>
//         <h2>{{ drawing.author.username }}</h2>
//       </ion-item>

//       <svg class="drawing" height="400px" width="400px">
//         <line *ngFor="let line of drawing.lines" 
//               [attr.x1]="line.x1" [attr.y1]="line.y1" 
//               [attr.x2]="line.x2" [attr.y2]="line.y2" 
//               style="stroke:rgb(255,0,0);
//               stroke-width:2" />
//       </svg>

//       <ion-row *ngIf="!drawing.is_guessed">
//         <ion-col>
//           <ion-item>
//             <ion-input #wordInput type="text" placeholder="Guess that... "></ion-input>
//           </ion-item>
//         </ion-col>
//         <ion-col center text-right>
//           <button (click)="guessThat(drawing,wordInput)" secondary>Guess!</button>
//         </ion-col>
//       </ion-row>
//     </ion-card>
//   `
// })
// export class DrawingListComponent {
//   drawings: Drawing[];

//   constructor(public nav: NavController, public drawingService:DrawingService) {
//     this.drawings = drawingService.drawings;
//   }

//   guessThat(drawing,wordInput) {
//     this.drawingService.guessDrawing(drawing, wordInput.value)
//   }
// }