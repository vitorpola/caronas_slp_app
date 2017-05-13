import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../providers/utils';
import { AuthService } from '../../providers/auth-service';
import { RidesProvider } from '../../providers/rides-provider';
import { MyRidesShowPage } from './show/show';

@Component({
  selector: 'page-my-rides',
  templateUrl: 'my-rides.html'
})
export class MyRidesPage {
  rides: Array<any> = [];

  constructor(public nav: NavController, public navParams: NavParams, public utils: Utils, public provider: RidesProvider, public auth: AuthService) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRidesPage');
  }

  ionViewWillEnter() {
    this.updateRides();
  }

  public showRide(param) {
    this.nav.push(MyRidesShowPage, param);
  }

  private updateRides() {
    this.utils.showLoading();
    console.log(this.auth.getUserInfo());
    this.provider.getByUser({ id: 1 }).subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.utils.hideLoading();
          this.rides = data;
        });
      }
    }, error => { this.utils.showError(error) });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.updateRides();
      refresher.complete();
    }, 600);
  }

  status(ride){
    if(ride.status == 'active' && new Date(ride.end_at) < new Date()){
      return 'off'
    }else{
      return ride.status;
    }
  }

}
