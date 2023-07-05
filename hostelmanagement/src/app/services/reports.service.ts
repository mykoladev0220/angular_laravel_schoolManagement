import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
serverIp=ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }
  getallocationsReports(data:any,headers:any)
  {
return this.httpclient.post(this.serverIp+'/allocationreport',data,headers);

  }
}
