import { Injectable, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { Push } from 'ionic-native';
import { RidesIndexPage } from '../pages/rides/index/index';
import 'rxjs/add/operator/map';

@Injectable()
export class PushService {

  @ViewChild(Nav) nav: Nav;
  constructor(public alertCtrl: AlertController, public platform: Platform) { }

  public initPushNotification() {
    let push = Push.init({
      android: {
        senderID: "881061981620"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      }
    });
    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
      localStorage.setItem('device_token', data.registrationId);
    });
    push.on('notification', (data) => {
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'Nova Notificação',
          message: data.message,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.push(RidesIndexPage, { message: data.message });
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }

}
