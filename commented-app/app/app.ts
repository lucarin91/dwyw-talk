// import {Component} from '@angular/core';
// import {Platform, ionicBootstrap} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
// import {TabsPage} from './pages/tabs';
// import {LobbyService} from './services/LobbyService';
// import {SocketService} from './services/SocketService';
// import {DrawingService} from './services/DrawingService';

// @Component({
//   template: '<ion-nav [root]="rootPage"></ion-nav>',
//   providers: []
// })
// export class MyApp {

//   private rootPage:any;
//   private socket:any;

//   constructor(private platform:Platform ) {
//     this.rootPage = TabsPage;

//     platform.ready().then(() => {  
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       StatusBar.styleDefault();
//     });
//   }
// }

// ionicBootstrap(MyApp, [SocketService, DrawingService, LobbyService])
