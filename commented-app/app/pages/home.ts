// import {Component} from '@angular/core';
// import {Modal, NavController} from 'ionic-angular';
// import {LobbyService} from '../services/LobbyService';
// import {DrawingService} from '../services/DrawingService';
// import {DrawingListComponent} from '../components/DrawingList.component'
// import {LoginModalComponent} from '../components/LoginModal.component'
// import { UUID } from 'angular2-uuid';

// @Component({
//   template:  `
//   <ion-navbar *navbar>
//     <ion-title>Home</ion-title>
//   </ion-navbar>

//   <ion-content padding class="home">
//     <drawing-list></drawing-list>
//   </ion-content>
//   `,
//   providers: [],
//   directives: [DrawingListComponent]
// })
// export class HomePage {

//   constructor(private navController: NavController, 
//               private lobbyService: LobbyService,
//               private drawingService: DrawingService) {

//                 var debug = false;
//     if(debug)
//     {
//       this.lobbyService.login(UUID.UUID(), 'beer', 'red');
//       return;
//     }

//     if(lobbyService.currentUser == null) {
//         let modal = Modal.create(LoginModalComponent);
//         this.navController.present(modal);
//     }

//   }
// }
