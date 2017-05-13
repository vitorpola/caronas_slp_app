import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './http-client';
import { Facebook, Device } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  private currentUser: User;

  constructor(public http: Http, public client: HttpClient, private platform: Platform) {
    //Facebook.browserInit(1865444407024294);
  }

  public login(params) {
    if (!this.platform.is('mobileweb') || !this.platform.is('core')) {
      params = this.setDeviceInfo(params);
    }
    return this.http.post(this.client.api_path + 'users/login', params).map(this.extractData);
  }

  public loginWithFacebook() {
    var authParams = { authentication: {}, user: {} };
    if (!this.platform.is('mobileweb') || !this.platform.is('core')) {
      authParams = this.setDeviceInfo(authParams);
    }
    var _http = this.http;
    var _client = this.client;
    var _extractData = this.extractData;

    return Observable.create(observer => {
      Facebook.login(["email", "public_profile"])
        .then(function (response) {
          let userId = response.authResponse.userID;
          let params = new Array();
          let authResponse = response.authResponse;
          authResponse['provider'] = 'facebook';
          authParams.authentication['authResponse'] = authResponse;

          console.log(response);
          Facebook.api("/me?fields=name,gender,email", params)
            .then(function (user) {
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              console.log(user);
              authParams.user = user;
              console.log(authParams);
              _http.post(_client.api_path + 'users/authentications', authParams).map(_extractData).subscribe(data => {
                observer.next(data);
                observer.complete();
              },
                error => {
                  observer.next(false);
                  observer.complete();
                });
            })
        }, function (error) {
          console.log(error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  private extractData(res: Response) {
    const body = res.json();
    if (body.result == 'success') {
      var usr = JSON.parse(body.user);
      window.localStorage.setItem("user_token", usr.token);
      return body || {};
    } else if (body.result == 'error') {
      return false;
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Por favor, preencha o email, nome e senha");
    } else {
      return this.http.post(this.client.api_path + 'users', credentials).map(this.extractData);
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public setUserInfo(user) {
    console.log('setUser', user);
    this.currentUser = new User(user.id, user.name, user.email, user.picture_url);
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      window.localStorage.setItem("user_token", '');
      Facebook.logout();
      observer.next(true);
      observer.complete();
    });
  }

  private setDeviceInfo(params) {
    params['uuid'] = Device.uuid;
    params['model'] = Device.model;
    params['platform'] = Device.platform;
    params['version'] = Device.version;
    params['device_token'] = localStorage.getItem('device_token');
    return params;
  }
}


export class User {
  id: number;
  name: string;
  email: string;
  picture_url: string;

  constructor(id: number, name: string, email: string, picture_url: string) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.picture_url = picture_url;
  }
}