import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UsersProvider } from '../../providers/users-provider';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, public utils: Utils, private prov: UsersProvider) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Sucesso", "Conta criada com sucesso.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  checkEmail() {
    this.prov.checkEmail(this.registerCredentials.email).subscribe(valid => {
      if (valid !== true) {
        setTimeout(() => {
          let alert = this.alertCtrl.create({
            title: 'Email Inválido',
            subTitle: 'O email já existente na base de dados',
            buttons: [
              {
                text: 'OK',
                handler: data => {
                  this.registerCredentials.email = '';
                }
              }
            ]
          });
          alert.present();
        });
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}