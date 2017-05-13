import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../../providers/utils';
import { AuthService } from '../../../providers/auth-service';
import { RidesProvider } from '../../../providers/rides-provider';
import { RidesFilterPage } from '../filter/filter';
import { RidesShowPage } from '../show/show';
import { RidesNewPage } from '../new/new';

@Component({
  selector: 'page-rides-index',
  templateUrl: 'index.html',
})
export class RidesIndexPage {
  rides: Array<any>;
  filter = {};
  type = 'offer';
  constructor(public nav: NavController, public navParams: NavParams, public utils: Utils, public provider: RidesProvider, public auth: AuthService) {
  }

  ionViewWillEnter() {
    this.updateRides();
  }

  public showRide(id) {
    this.nav.push(RidesShowPage, id);
  }

  public openFilter() {
    this.nav.push(RidesFilterPage, this.filter);
  }

  public newRide(param) {
    this.nav.push(RidesNewPage, param);
  }

  private updateRides() {
    this.utils.showLoading();
    //this.loadParams(this.navParams);
    this.provider.getAll(null).subscribe(data => {
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

}
