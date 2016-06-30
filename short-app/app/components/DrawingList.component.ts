import { Component, Input } from '@angular/core';
import { Drawing } from '../models';
import { DrawingService } from '../services/DrawingService';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'drawing-list',
  directives: [],
  inputs: ['drawingList'],
  providers: [],
  template: `
    <ion-card *ngFor="let drawing of drawings">
      <ion-item>
        <h2>{{ drawing.author.username }}</h2>
      </ion-item>

      <svg class="drawing" height="400px" width="400px">
        <line *ngFor="let line of drawing.lines" 
              [attr.x1]="line.x1" [attr.y1]="line.y1" 
              [attr.x2]="line.x2" [attr.y2]="line.y2" 
              style="stroke:rgb(255,0,0);
              stroke-width:2" />
      </svg>
  `
})
export class DrawingListComponent {
  drawings: Drawing[];

  constructor(public nav: NavController, public drawingService:DrawingService) {
    this.drawings = drawingService.drawings;
  }
}