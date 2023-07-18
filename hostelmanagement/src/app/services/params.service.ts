import { Injectable } from '@angular/core';
import { EncriptionserviceService } from './encriptionservice.service';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
item:any;
  constructor(private encription:EncriptionserviceService) { }
  setparam(key:any,value:any){

    sessionStorage.setItem(key, this.encription.encrypt(JSON.stringify(value)));
  }
  getparam(key:any){
 if(key in sessionStorage){
  this.item=  sessionStorage.getItem(key);

  return JSON.parse(this.encription.decrypt(this.item));
 }
 return this.item;
  }
  removeparam(key:any){
    sessionStorage.removeItem(key);
  }
  clearAll(){
    sessionStorage.clear();
  }
}
