import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LevelpreferenceService {
  serverIP = environment.domain;
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
