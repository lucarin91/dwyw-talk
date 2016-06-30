import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DrawingCanvasComponent} from '../components/DrawingCanvas.component'
@Component({
  template: `
  <ion-navbar *navbar>
    <ion-title>Draw</ion-title>
  </ion-navbar>

  <ion-content #content padding>
    <drawing-canvas [test]="content"></drawing-canvas>
  </ion-content>
  `,
  directives: [DrawingCanvasComponent]

})
export class DrawPage {
  constructor(private navController: NavController) {
  }
}