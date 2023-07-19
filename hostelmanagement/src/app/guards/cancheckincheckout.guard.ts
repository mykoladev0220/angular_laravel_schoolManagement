import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ParamsService } from '@services/params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancheckincheckoutGuard implements CanActivate {
cancheckin=false;
  constructor(private params:ParamsService,private router:Router){

  }
  canActivate(){
    if(this.getright())
    {
      return true;
    }
else{
  this.router.navigate(['hostels']);
  return false;
}
  }
  getright(){

    var myrights=this.params.getparam('myrights');
    this.cancheckin=myrights.check_checkout;

    return this.cancheckin;
      }
}
