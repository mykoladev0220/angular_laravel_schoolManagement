import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
serverIp=environment.domain;
  constructor(private httpclient:HttpClient) { }
  getallocationsReports(data:any,headers:any)
  {
return this.httpclient.post(this.serverIp+'/allocationreport',data,headers);

  }
}
