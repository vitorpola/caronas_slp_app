import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {

  feedback: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  newFeedback(){
    this.utils.showAlert("Muito Obrigado!", "Agradecemos muito a sua contribuição.", null, false);
  }

}
