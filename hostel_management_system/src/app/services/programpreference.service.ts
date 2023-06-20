import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class ProgrampreferenceService {

  serverIP =ServerDetails.serverIP;
  constructor(private httpclient: HttpClient) {}

  getallprogrammes(data:any,headers: any) {
    return this.httpclient.post(
      this.serverIP + '/getallprogrames',data,

      headers
    );
  }
  removeProgramPreference(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/deleteprogramsession',
      data,
      headers
    );
  }
  CreateprogramPreference(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/createprogramsession',
      data,
      headers
    );
  }
  getallprogramPreference(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/getsessionprogrammes',
      data,
      headers
    );
  }

}
