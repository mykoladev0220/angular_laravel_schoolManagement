import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root',
})
export class ActiveperiodsService {
  serverIp = ServerDetails.serverIP;

  constructor(private http: HttpClient) {}

  createActiveperiod(data: any, headers: any) {
    return this.http.post(this.serverIp + '/createactiveperiod', data, headers);
  }
  getActivePeriod(headers: any) {
    return this.http.get(this.serverIp + '/getactiveperiod', headers);
  }

  getCurrentActivePeriod(headers: any) {
    return this.http.get(this.serverIp + '/getcurrentactiveperiod', headers);
  }

  deactivateActiveperiod(data: any, headers: any) {
    return this.http.post(this.serverIp + '/deactivatePeriod', data, headers);
  }
  activateActiveperiod(data: any, headers: any) {
    return this.http.post(this.serverIp + '/activatePeriod', data, headers);
  }
  deleteActiveperiod(data: any, headers: any) {
    return this.http.post(this.serverIp + '/deletePeriod', data, headers);
  }

  updateActtivePeriod(data: any, headers: any) {
    return this.http.post(this.serverIp + '/updateactiveperiod', data, headers);
  }
}
