import { ServerDetails } from '@/models/server-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckcheckoutService {

  serveIP = ServerDetails.serverIP;

  constructor(private http:HttpClient) { }
  getcheckindata(data:any,headers:any){
    return this.http.post(this.serveIP+'/warden/getcheckindata',data,headers);
    }
  
    getCheckoutdata(data:any,headers:any){
      return this.http.post(this.serveIP+'/warden/getcheckoutdata',data,headers);
    }



      Checkin(data:any,headers:any){
    return this.http.post(this.serveIP+'/warden/checkin',data,headers);
      }

      Checkout(data:any,headers:any){
        return this.http.post(this.serveIP+'/warden/checkout',data,headers);
          }

}
