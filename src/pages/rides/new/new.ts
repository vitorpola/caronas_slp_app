import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RelatableModalPage } from '../../relatable-modal/relatable-modal';
import { RidesProvider } from '../../../providers/rides-provider';
import { Utils } from '../../../providers/utils';

@Component({
  selector: 'page-rides-new',
  templateUrl: 'new.html'
})
export class RidesNewPage {
  ride: any = {};
  categories_list: Array<any>;
  responsibles_list: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov: RidesProvider, private utils: Utils) {
    this.ride.type = this.navParams.data;
    this.ride.date = new Date().toISOString();
    if (this.ride.type == 'demand')
      this.ride.start_time = new Date().toISOString();
    this.ride.end_time = new Date().toISOString();
  }

  newRide() {
    console.log(this.ride);
    this.ride.date = this.ride.date.substring(0, 10);
    this.ride.end_time = this.ride.end_time.substring(11, 16);
    if (this.ride.type == 'demand') {
      this.ride.start_time = this.ride.start_time.substring(11, 16);
    }else{
      this.ride.start_time = this.ride.end_time;
    }

    if (this.ride.to_city == 'other') {
      this.ride.to_city_name = this.ride.to_other_city;
    } else {
      this.ride.to_city_name = this.ride.to_city;
    }

    if (this.ride.from_city == 'other') {
      this.ride.from_city_name = this.ride.from_other_city;
    } else {
      this.ride.from_city_name = this.ride.from_city;
    }
    this.prov.create(this.ride).subscribe(data => {
      if (data.result == 'success') {
        this.utils.showToast('Carona cadastrada.');
        this.navCtrl.pop();
      } else {
        console.log(data);
      }
    }, error => { console.log(error) });
  }

}
