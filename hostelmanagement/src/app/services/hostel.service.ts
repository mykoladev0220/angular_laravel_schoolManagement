import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
serverIp=ServerDetails.serverIP;

  constructor(private httpClient:HttpClient) {

  }
deleteHostel(data:any,headers:any){

    return this.httpClient.post(this.serverIp+'/deleteHostel', data,headers);
  }
 updateHostel(data:any,headers:any){
  return this.httpClient.post(this.serverIp+'/updatehostel', data,headers);
  }
findHostels(location:any,headers:any){
  return this.httpClient.post(this.serverIp+'/findhostels',location,headers);
}
getHostels(headers:any)
{

  return this.httpClient.get(this.serverIp+'/hostellist',headers);
}

addHostels(data:any,headers:any)
{
  return this.httpClient.post(this.serverIp+'/addhostel', data,headers);
}

}
