import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RidesProvider } from '../../../providers/rides-provider';
import { Utils } from '../../../providers/utils';
import { AuthService } from '../../../providers/auth-service';
import { NewCommentModal } from '../../comments/new';
import { CallNumber } from 'ionic-native';

@Component({
  selector: 'page-rides-show',
  templateUrl: 'show.html'
})
export class RidesShowPage {

  ride: any = {};
  info = 'details';

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: RidesProvider, public utils: Utils, private auth: AuthService) { }

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

  askRide() {
    var buttons = [
      {
        text: 'Confirmar',
        handler: () => {
          this.provider.confirm({ ride_id: this.navParams.data }).subscribe(data => {
            if (data.result == 'success') {
              this.utils.showToast('Seu pedido de carona foi realizado. Aguarde a resposta...');
              this.navCtrl.pop();
            } else {
              console.log(data);
            }
          }, error => { console.log(error) });
        }
      }
    ];
    var title = '';
    var text = '';
    if (this.ride.ride_type == 'offer') {
      title = 'Pedido de Carona';
      text = 'Deseja realmente fazer o pedido para o motorista?';
    } else {
      title = 'Oferta de Carona';
      text = 'Deseja oferecer carona para esta pessoa?';
    }
    this.utils.showAlert(title, text, buttons, true);
  }

  newCommentModal() {
    this.utils.showModal(NewCommentModal, { id: this.ride.id }).onDidDismiss(data => {
      if (typeof data != 'undefined')
        this.ride['comments'].push(data);
    });
  }

  callNumber(number) {
    console.log('ligar para ' + number);
    CallNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  mailTo(address) {
    console.log('enviar email para: ' + address);
    window.open(`mailto:${address}`, '_system');
  }

}
