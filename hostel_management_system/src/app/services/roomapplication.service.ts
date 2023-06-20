import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class RoomapplicationService {
serverip=ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }

  getapplicationreport(data:any,headers:any){
    return this.httpclient.post(this.serverip+"/getapplicationsreports",data,headers);

  }
}
