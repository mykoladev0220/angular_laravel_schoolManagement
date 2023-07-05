import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  serverIp =ServerDetails.serverIP;
  constructor(private http:HttpClient) { }

  getlevels(headers:any){
    return this.http.get(this.serverIp+'/getacademiclevel',headers);
  }
}
