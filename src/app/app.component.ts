import { Component, ViewChild } from '@angular/core';
import { Platform, Menu, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { FeedbackPage } from '../pages/feedback/feedback';
import { RidesIndexPage } from '../pages/rides/index/index';
import { MyRidesPage } from '../pages/my-rides/my-rides';
import { Utils } from '../providers/utils';
import { AuthService } from '../providers/auth-service';
import { PushService } from '../providers/push-service';
import { MyInfoPage } from '../pages/my-info/my-info';
import { enableProdMode } from '@angular/core';
enableProdMode();

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;
  pages: Array<any>;
  current_user = {};
  @ViewChild(Menu) menu: Menu;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, public auth: AuthService, push: PushService, private utils: Utils) {

    this.pages = [
      { title: 'Caronas', component: RidesIndexPage, icon: 'car' },
      { title: 'Minhas caronas', component: MyRidesPage, icon: 'contact' },
      { title: 'Feedback', component: FeedbackPage, icon: 'chatbubbles' },
      { title: 'Sobre', component: AboutPage, icon: 'information-circle' },
    ];

    this.verifyUser();
    platform.ready().then(() => {
      Splashscreen.hide();
      StatusBar.backgroundColorByHexString('#FE675C');
      if (platform.is('android') && !platform.is('mobileweb'))
        push.initPushNotification();

      this.utils.events.subscribe('user:update', (args) => {
        this.current_user = args;
        this.auth.setUserInfo(args);
      });
    });
  }

  openPage(page: any): void {
    this.menu.enable(true);
    this.nav.setRoot(page.component);
    this.menu.close();
  }

  logout() {
    this.auth.logout().subscribe(data => {
      if (data) {
        this.menu.close();
        this.rootPage = LoginPage;
      }
    })
  }


  openMyInfo() {
    this.menu.close();
    this.nav.push(MyInfoPage);
  }

  private verifyUser() {
    let auth_token = localStorage.getItem('user_token');
    if (typeof auth_token != 'undefined' && auth_token != null && auth_token.length > 0) {
      this.auth.login({ auth_token }).subscribe(data => {
        if (data) {
          this.utils.events.publish('user:update', JSON.parse(data.user));
          this.rootPage = RidesIndexPage;
        } else {
          this.rootPage = LoginPage;
        }
      },
        error => { console.log(error); this.rootPage = LoginPage });
    } else {
      this.rootPage = LoginPage;
    }
  }
}
