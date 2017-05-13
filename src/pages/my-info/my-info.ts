import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../providers/utils';
import { Camera } from 'ionic-native';
import { UsersProvider } from '../../providers/users-provider';

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html'
})
export class MyInfoPage {

  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils, public provider: UsersProvider) { }

  ionViewDidLoad() {
    this.user = {};
    this.provider.show(1).subscribe(data => {
      this.user = data;
    }, error => { this.utils.showError(error) })
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 200,
      targetHeight: 200
    }).then((imageData) => {
      this.addPhotoHome("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }

  // Chama o service para adicionar uma nova foto
  addPhotoHome(photo) {
    console.log(photo);
  }

  confirmInfo() {
    this.utils.showLoading();
    this.provider.update({user: this.user}).subscribe(data => {
      if (data.result == 'success') {
        this.utils.hideLoading();
        this.utils.showToast('Informações alteradas com successo.');
      } else {
        this.utils.showError(data);
        this.utils.hideLoading();
      }
    }, error => { this.utils.showError(error); this.utils.hideLoading(); });
  }


}
