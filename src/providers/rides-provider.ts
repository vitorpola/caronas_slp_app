import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class RidesProvider {

  constructor(public http: HttpClient) {
  }

  public getAll(params){
    return this.http.get('rides', params);
  }

  public getByUser(params){
    return this.http.get('rides/by_user', params);
  }

  public create(params){
    return this.http.post('rides', params);
  }

  public show(id){
    return this.http.get('rides/' + id, null);
  }

  public confirm(params){
    return this.http.post('passengers', params);
  }
  
}
