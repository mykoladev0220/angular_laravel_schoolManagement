import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  serverIp = ServerDetails.serverIP;
  constructor(private http:HttpClient) { }

  getlocations(headers:any)
  {
    return this.http.get(this.serverIp+'/getlocations',headers);
  }


}
