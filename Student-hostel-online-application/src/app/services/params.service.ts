import { Injectable } from '@angular/core';
import { EncriprionserviceService } from './encriprionservice.service';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
item:any
  constructor() { }
setparam(key:any,value:any){
sessionStorage.setItem(key,value);
}
getparam(key:any){
this.item=sessionStorage.getItem(key);
 return this.item;


  }


}
