import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RidesIndexPage } from '../index/index';

@Component({
  selector: 'page-rides-filter',
  templateUrl: 'filter.html'
})
export class RidesFilterPage {
  status_list:        Array<any>;
  categories_list:    Array<any>;
  responsibles_list:  Array<any>;
  
  filter = { responsible: '', status: '', category: ''};

  constructor(public nav: NavController, public params: NavParams) {
    this.filter = this.params.data;
    if(this.filter.responsible == '')
      this.filter.responsible = '-1';

  }

  public confirmFilter(){
      this.nav.setRoot(RidesIndexPage, this.filter);
  }

}
