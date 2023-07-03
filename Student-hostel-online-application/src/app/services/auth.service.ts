import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncriprionserviceService } from './encriprionservice.service';
import { ParamsService } from './params.service';
import { Router } from '@angular/router';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverip = ServerDetails.serverIP;
  token: any;
  token1: any;
  authenticated:any;


  constructor(
    private httpclient: HttpClient,
 private params:ParamsService,
 private encservice:EncriprionserviceService,
 private router:Router
  ) {}
logout()
{
 sessionStorage.clear();
  this.router.navigate(['login']);
}


  login(data: any) {
    return this.httpclient.post(this.serverip + '/student-login', data);
  }
  getHeaders() {


    this.token=this.params.getparam('accesstocken');
this.token=this.encservice.decrypt( this.token);
    const headers = new HttpHeaders({
      Accept: 'pplication/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + this.token,
    });
    return headers;
  }
}
