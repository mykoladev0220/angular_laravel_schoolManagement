import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  serverIp = ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }
createBlacklist(data:any,headers:any){
  return this.httpclient.post(this.serverIp+'/blacklist',data,headers);
}
getBlacklist(headers:any){
  return this.httpclient.get(this.serverIp+'/blacklist',headers);
}
deleteBlacklist(data:any,headers:any){
  return this.httpclient.post(this.serverIp+'/removeblacklist',data,headers);
}


}
