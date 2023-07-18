import { Checkin } from './../models/checkin.model';
import { ServerDetails } from '@/models/server-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekckCheckoutService {
serveIP=ServerDetails.serverIP;
  constructor(private http:HttpClient) { }

getcheckindata(data:any,headers:any){
return this.http.post(this.serveIP+'/allocations/getcheckindata',data,headers);
}
getCheckinreport(data:any,headers:any){
  return this.http.post(this.serveIP+'/allocations/getcheckinreport',data,headers);
}
getCheckoutdata(data:any,headers:any){
  return this.http.post(this.serveIP+'/allocations/getcheckoutdata',data,headers);
}
getCheckoutreportdata(data:any,headers:any){
  return this.http.post(this.serveIP+'/allocations/getcheckoutreportdata',data,headers);
}


  Checkin(data:any,headers:any){
return this.http.post(this.serveIP+'/allocations/checkin',data,headers);
  }

  Checkout(data:any,headers:any){
    return this.http.post(this.serveIP+'/allocations/checkout',data,headers);
      }

 cancel_Checkin(data:any,headers:any){
    return this.http.post(this.serveIP+'/allocations/checkin/cancel',data,headers);
      }

  cancel_Checkout(data:any,headers:any){
    return this.http.post(this.serveIP+'/allocations/checkout/cancel',data,headers);
      }
}
