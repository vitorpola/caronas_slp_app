import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpClient {

  public api_path: string = 'http://0.0.0.0:3000/';

  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', localStorage.getItem('user_token'));
  }

  get(url, data) {
    let headers = new Headers();
    console.log(url);
    this.createAuthorizationHeader(headers);
    let obj = { headers: headers, search: null };
    if (data != null) {
      obj.search = this.mountParams(data);
    }
    return this.http.get(this.api_path + url, obj).map(this.extractData);
  }

  post(url, data) {
    console.log(url);
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.api_path + url, data, {
      headers: headers
    }).map(this.extractData);
  }

  put(url, data) {
    console.log(url);
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.api_path + url, data, {
      headers: headers
    }).map(this.extractData);
  }

  delete(url) {
    console.log(url);
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.api_path + url, {
      headers: headers
    }).map(this.extractData);
  }


  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }
  private mountParams(filter) {
    let params: URLSearchParams = new URLSearchParams();
    for (var x in filter) {
      params.set(x, filter[x]);
    }
    return params;
  }
}
