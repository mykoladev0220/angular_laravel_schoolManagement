import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  serverip=ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }

studentDetails(data:any,headers:any){
    return this.httpclient.post(this.serverip+"/getastudentdetails",data,headers);

  }
}
