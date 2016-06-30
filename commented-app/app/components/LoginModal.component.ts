// import {Component} from '@angular/core';
// import {Modal, NavController,ViewController, Toast} from 'ionic-angular';
// import {LobbyService} from '../services/LobbyService';

// @Component({
//   template: `
//   <ion-content padding>

//     <h2 class="app-title">DWYW</h2>

//     <h2>Choose your username!</h2>
//     <ion-item>
//       <ion-label>Username</ion-label>
//       <ion-input #usernameInput type="text" ></ion-input>
//     </ion-item>

//     <h2>Choose your avatar!</h2>
//     <ion-row>
//         <ion-col *ngFor="let avatar of avatars">
//           <ion-icon [style.color]="selectedColor" [ngClass]="{'selected-avatar': avatar == selectedAvatar }" (click)="selectAvatar(avatar)" class="avatar-icon" [name]="avatar"></ion-icon>
//         </ion-col>
//     </ion-row>

//     <h2>Choose your avatar color!</h2>
//     <div>
//       <div *ngFor="let color of avatarColors"
//            (click)="selectColor(color)"
//            class="color-box"
//            [ngClass]="{'selected-avatar': color == selectedColor }"
//            [style.background]="color">
//       </div>
//     </div>

//     <br>
//     <button secondary full (click)="doLogin(usernameInput)">Login</button>
         
//   </ion-content>`
// })

// export class LoginModalComponent {

//   avatars = ['ionic','logo-angular','heart','ionitron'];
//   avatarColors = ['#F22233', '#F2F2F2', '#278C41', '#F2A413', '#F2561D'];
//   selectedAvatar:string = this.avatars[0];
//   selectedColor:string = this.avatarColors[0];

//   subscription: any;


//   constructor(private nav:NavController, private viewCtrl: ViewController, public lobbyService: LobbyService) {}

//   ngOnInit() {
//     this.subscription = this.lobbyService.getLoginStatusChangeEmitter()
//       .subscribe((event) => {
//         if(event == 'login_success'){
//             this.viewCtrl.dismiss();
//         }
//         else if(event == 'username_already_taken') {
//           this.showToast("Username already taken please choose another");
//         }
//       });
//   }

//   selectAvatar(avatar) {
//     this.selectedAvatar = avatar;
//   }

//   selectColor(color) {
//     this.selectedColor = color;
//   }

//   doLogin(usernameInput) {

//     if(usernameInput.value === undefined || usernameInput.value == "") {
//       this.showToast("Please choose a valid username!");
//       return;
//     }

//     this.lobbyService.login(usernameInput.value, this.selectedAvatar, this.selectedColor);
//   }

//   showToast(message) {
//     let toast = Toast.create({
//       message: message,
//       duration: 2000
//     });

//     this.nav.present(toast);
//   }
// }