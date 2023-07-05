import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {
  serverIP=ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }
  getRoomType(headers:any){
   return this.httpclient.get(this.serverIP+"/getroomtypes",headers);
  }
  addroomType(data:any,headers:any){
   return this.httpclient.post(this.serverIP+"/createroomtype",data,headers);
  }
  deleteRoomType(data:any,headers:any){
    return this.httpclient.post(this.serverIP+"/deleteroomtype",data,headers);
   }
   setRoomcost(  data:any,headers:any){
    return this.httpclient.post(this.serverIP+"/setroomtypecost",data,headers);
   }
   getRoomcost( data:any,headers:any){
    return this.httpclient.post(this.serverIP+"/getRoomTypeCost",data,headers);
   }
}
