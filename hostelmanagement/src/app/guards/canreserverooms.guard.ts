import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ParamsService } from '../services/params.service';

@Injectable({
  providedIn: 'root'
})
export class CanreserveroomsGuard implements CanActivate {
  canreserve=false;
  constructor(private params:ParamsService,private router:Router){}
  canActivate() {
    if(this.getright()){
      return true;
    }else{
      this.router.navigate(['hostels']);
      return false;
    }
  }


  getright(){

    var myrights=this.params.getparam('myrights');
    this.canreserve=myrights.reserve_rooms

    return this.canreserve
      }



}
