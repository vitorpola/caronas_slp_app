import { Injectable, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Nav, LoadingController, Loading, AlertController, ToastController, ModalController, Events } from 'ionic-angular'
import 'rxjs/add/operator/map';


@Injectable()
export class Utils {

  @ViewChild(Nav) nav: Nav;
  loading: Loading;

  constructor(public http: Http, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, public toastCtrl: ToastController,
    public modalCtrl: ModalController, public events: Events) { }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Falha',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2500,
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'toast-msg'
    });
    setTimeout(() => {
      toast.present();
    }, 300)
    return toast;
  }

  showModal(page, params) {
    let modal = this.modalCtrl.create(page, params);
    modal.present();
    return modal;
  }

  showAlert(title, text, buttons, with_cancel, inputs?) {
    if (with_cancel) {
      buttons.unshift({
        text: 'Cancelar',
        handler: data => {
          alert.dismiss();
        }
      });
    }

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: buttons,
      inputs: inputs
    });
    alert.present();
  }

}
