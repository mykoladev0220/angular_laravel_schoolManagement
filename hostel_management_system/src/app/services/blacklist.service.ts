import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private httpclient:HttpClient) { }
createBlacklist(data:any,headers:any){
  return this.httpclient.post('http://localhost:8000/api/blacklist',data,headers);
}
getBlacklist(headers:any){
  return this.httpclient.get('http://localhost:8000/api/blacklist',headers);
}
deleteBlacklist(data:any,headers:any){
  return this.httpclient.post('http://localhost:8000/api/removeblacklist',data,headers);
}


}
