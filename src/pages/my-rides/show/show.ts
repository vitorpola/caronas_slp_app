import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RidesProvider } from '../../../providers/rides-provider';
import { Utils } from '../../../providers/utils';
import { NewCommentModal } from '../../comments/new';


@Component({
  selector: 'page-rides-show',
  templateUrl: 'show.html'
})
export class MyRidesShowPage {

  ride: any = {};
  info = 'details';

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: RidesProvider, public utils: Utils) { }

  ionViewWillEnter() {
    this.utils.showLoading();
    this.provider.show(this.navParams.data).subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.utils.hideLoading();
          console.log(data);
          this.ride = data;
        });
      }
    }, error => { this.utils.showError(error) });
  }

  newCommentModal() {
    this.utils.showModal(NewCommentModal, {id: this.ride.id}).onDidDismiss(data => {
      if (typeof data != 'undefined')
        this.ride['comments'].push(data);
    });
  }

}
