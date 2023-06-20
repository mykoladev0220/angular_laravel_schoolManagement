import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  serverIp = ServerDetails.serverIP;
  constructor(private http:HttpClient) { }
  deleteFloor(data:any,headers:any)
  {
    return this.http.post(this.serverIp+'/deletefloor',data,headers);
  }

  getBatchFloor(data:any,headers:any)
  {
    return this.http.post(this.serverIp+'/getbatchfloors',data,headers);
  }
  getFloor(data:any,headers:any)
  {
    return this.http.post(this.serverIp+'/getfloors',data,headers);
  }
  addfloors(data:any,headers:any){
    return this.http.post(this.serverIp+'/addfloor',data,headers);
  }
}
