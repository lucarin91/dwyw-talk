import {Component} from '@angular/core';
import {Modal, NavController,ViewController, Toast} from 'ionic-angular';
import {LobbyService} from '../services/LobbyService';

@Component({
  template: `
  <ion-content padding>
    <h2>Choose your username!</h2>
    <ion-item>
      <ion-label>Username</ion-label>
      <ion-input #usernameInput type="text" ></ion-input>
    </ion-item>
    <br>
    <button secondary full (click)="doLogin(usernameInput)">Login</button>
  </ion-content>`
})

export class LoginModalComponent {

  constructor(private nav:NavController, private viewCtrl: ViewController, public lobbyService: LobbyService) {}

  doLogin(usernameInput) {
    this.lobbyService.login(usernameInput.value);  
    this.viewCtrl.dismiss();
  }

}