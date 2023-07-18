import { ServerDetails } from '@/models/server-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubwardenService {
serverip=ServerDetails.serverIP;
  constructor(private http:HttpClient) { }
createwarden(data:any,headers:any){
  return this.http.post(this.serverip+'/createsubwarden',data,headers);
}
assignwarden(data:any,headers:any){
  return this.http.post(this.serverip+'/subwarden/assignhostel',data,headers);
}
unassignwarden(data:any,headers:any){
  return this.http.post(this.serverip+'/subwarden/unassignhostel',data,headers);
}
getsubwardens(headers:any){
  return this.http.get(this.serverip+'/subwarden/getsubwardens',headers);
}
getwadendetails(data:any,headers:any){

  return this.http.post(this.serverip+'/subwarden/getassignments',data,headers);
}
}
