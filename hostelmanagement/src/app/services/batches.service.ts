import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../models/server-details';


@Injectable({
  providedIn: 'root'
})
export class BatchesService {
  serverIp = ServerDetails.serverIP;
  constructor(private httpclient:HttpClient) { }

  createBatch(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/createBatch',data,headers);
  }
  getBatches(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/Batches',data,headers);
  }
  getBatchesAll(headers:any){
    return this.httpclient.get(this.serverIp+'/Batchesall',headers);
  }
  updateBatch(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/updateBatch',data,headers);
  }
  deletebatch(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/deleteBatch',data,headers);
  }
  activateBatch(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/activateBatch',data,headers);
  }
  deactivate(data:any,headers:any){
    return this.httpclient.post(this.serverIp+'/deactivateBatch',data,headers);
  }
}
