import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserListComponent} from '../components/UserList.component'
@Component({
  template: `
  <ion-navbar *navbar>
    <ion-title>
      Users list
    </ion-title>
  </ion-navbar>

  <ion-content padding>
      <user-list></user-list>
  </ion-content>
  `,
  directives: [UserListComponent]

})
export class LobbyPage {
  constructor(private navController: NavController) {
  }
}
