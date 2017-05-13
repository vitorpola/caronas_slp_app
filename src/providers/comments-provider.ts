import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentsProvider {

  constructor(public http: HttpClient) {}

  public create(params){
    return this.http.post('comments', params);
  }

}
