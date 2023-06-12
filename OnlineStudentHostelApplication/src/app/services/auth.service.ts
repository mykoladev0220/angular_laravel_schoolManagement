import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncriprionserviceService } from './encriprionservice.service';
import { ParamsService } from './params.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverip = 'http://127.0.0.1:8000/api';
  token: any;
  token1: any;
  authenticated:any;


  constructor(
    private httpclient: HttpClient,
 private params:ParamsService,
 private encservice:EncriprionserviceService
  ) {}
logout()
{
  
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
