// import { Component, Input } from '@angular/core';
// import { User } from '../models';
// import { LobbyService } from '../services/LobbyService';
// import {NavController, Toast} from 'ionic-angular';

// @Component({
//   selector: 'user-list',
//   directives: [],
//   inputs: ['users'],
//   providers: [],
//   template: `
//     <ion-list *ngFor="let user of users">
//       <ion-item>
//         <ion-icon [style.color]="user.avatar_color" name="{{ user.avatar }}" item-left></ion-icon>
//           {{user.username}}
//         <ion-icon class="star" name="star" item-right>{{ user.points }}</ion-icon>
//       </ion-item>
//     </ion-list>
//   `
// })
// export class UserListComponent {
//   users: User[];

//   constructor(public nav: NavController, public lobbyService:LobbyService) {
//     this.users = lobbyService.userList;
//     console.log("this.users", this.users);
//   }
// }