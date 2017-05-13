import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) { }

  public checkEmail(email) {
    return this.http.get('users/check_email', { email });
  }

  public show(id) {
    return this.http.get('users/' + id, null);
  }

  public update(params) {
    return this.http.post('users/alter' , params);
  }


}
