import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root',
})
export class LevelpreferenceService {
  serverIP = ServerDetails.serverIP;
  constructor(private httpclient: HttpClient) {}

  CreateLevelPerefernce(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/createlevelpreference',
      data,
      headers
    );
  }

  getLevelPreference(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/getlevelpreference',
      data,
      headers
    );
  }
  removeLevelPreference(data: any, headers: any) {
    return this.httpclient.post(
      this.serverIP + '/removelevelpreference',
      data,
      headers
    );
  }
}
