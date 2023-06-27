import { Injectable } from '@angular/core';
import { EncriptionserviceService } from './encriptionservice.service';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
item:any;
  constructor(private encription:EncriptionserviceService) { }
  setparam(key:any,value:any){

    localStorage.setItem(key, this.encription.encrypt(JSON.stringify(value)));
  }
  getparam(key:any){
    this.item=  localStorage.getItem(key);

    return JSON.parse(this.encription.decrypt(this.item));
  }
  clearAll(){
    localStorage.clear();
  }
}
