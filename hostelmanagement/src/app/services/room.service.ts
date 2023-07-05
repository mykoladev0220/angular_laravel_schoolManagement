import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
serverIP=ServerDetails.serverIP;
  constructor(private http:HttpClient) {

   }
   reserveRoom(room:any,headers:any){
    return this.http.post(this.serverIP+'/resavations', room,headers);
   }
   unReserveRoom(room:any,headers:any){
    return this.http.post(this.serverIP+'/unreserve', room,headers);
   }
   findReservedRoom(data:any,headers:any){
    return this.http.post(this.serverIP+'/findresevedrooms',data, headers);
   }
  getRoomstoreserve(data:any,headers:any){
    return this.http.post(this.serverIP+'/getroomstoreserve',data, headers);
   }

   getReservedRoom(headers:any){
    return this.http.get(this.serverIP+'/resavations', headers);
   }
updateroom(data:any,headers:any)
{

  return this.http.post(this.serverIP+'/updateRoom', data,headers);
}

   getRooms(data:any,headers:any)
   {
    return this.http.post(this.serverIP+'/getrooms',data,headers);
   }
   deleteRoom(data:any,headers:any)
   {
    return this.http.post(this.serverIP+'/deleteRoom', data,headers);
   }
   createRooms(data:any,headers:any)
   {
return this.http.post(this.serverIP+'/addroom',data,headers);

   }
}
