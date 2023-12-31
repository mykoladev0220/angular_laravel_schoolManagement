import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsService } from './params.service';

import { ServerDetails } from '../models/server-details';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = null;
  serverIp = ServerDetails.serverIP;

  constructor(private httppclient: HttpClient,private paramservice:ParamsService,private router:Router) {}

  login(data: any) {
    return this.httppclient.post(this.serverIp+'/login', data);
  }

  resertpassword(data:any){


return this.httppclient.post(this.serverIp+'/sendresertlink',data);
  }

  changePasswordForgot(data:any){
    return this.httppclient.post(this.serverIp+'/changeforgotPassword',data);
  }
  register(data: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/register',
      data,
      headers
    );
  }
  activateUser(data: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/activateUser',
      data,
      headers
    );
  }
  deactivateUser(data: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/deactivateUser',
      data,
      headers
    );
  }

  getUsers(headers: any) {
    return this.httppclient.get(this.serverIp+'/getusers', headers);
  }
  changePassword(data: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/changePassword',
      data,
      headers
    );
  }
  removeRight(data: any, headers: any) {
return    this.httppclient.post(
      this.serverIp+'/removeright',
      data,
      headers
    );
  }
  assignRights(data: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/createrights',
      data,
      headers
    );
  }

  getrights(user: any, headers: any) {
    return this.httppclient.post(
      this.serverIp+'/getrights',
      user,
      headers
    );
  }
  getRole() {
    this.user = this.paramservice.getparam('user');

    return this.user.user_details.role;
  }
  chengePassword() {
    this.user =  this.paramservice.getparam('user');

    return this.user.prompt_change;
  }
  getUserId() {
    this.user = this.paramservice.getparam('user')

    return this.user.user_details.user_id;
  }
  getToken() {
    this.user =  this.paramservice.getparam('user');

    return this.user.access_token;
  }
  getHeaders() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + this.getToken(),
    });

    return headers;
  }
  authenticated() {
    return this.paramservice.getparam('user');
  }
  logout() {
    this.paramservice.clearAll();
this.router.navigate(['login']);
  }
}
