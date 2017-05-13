import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Utils } from '../../providers/utils';
import { RegisterPage } from '../register/register';
import { RidesIndexPage } from '../rides/index/index';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {};

  constructor(private nav: NavController, private auth: AuthService, private utils: Utils) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.utils.showLoading();
    this.auth.login(this.user).subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.utils.hideLoading();
          this.nav.setRoot(RidesIndexPage);
        });
      } else {
        this.utils.showError("Usuário e/ou senha inválidos.");
      }
    },
      error => {
        if (error.status == 0)
          this.utils.showError('Erro ao conectar à API');
        else
          this.utils.showError(error);
      });
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook().subscribe((success) => {
      console.log(success);
      setTimeout(() => {
        this.utils.hideLoading();
        this.nav.setRoot(RidesIndexPage);
      });
    }, err => {
      console.log(err);
    });
  }
}