import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';
import { CommentsProvider } from '../../providers/comments-provider';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-new-comment-modal',
  templateUrl: 'new.html'
})
export class NewCommentModal {

  comment = {};

  constructor( public navParams: NavParams, public viewCtrl: ViewController, public provider: CommentsProvider, public utils: Utils) { }

  ionViewDidLoad() {
    this.comment = {};
  }

  newComment() {
    this.comment['ride_id'] = this.navParams.data.id;
    this.provider.create(this.comment).subscribe(data => {
      if (data.result == 'success') {
        this.utils.showToast('Comentário cadastrado.');
        this.viewCtrl.dismiss(data);
      } else {
        this.utils.showError(data);
      }
    }, error => { this.utils.showError(error); });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
