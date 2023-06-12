import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ParamsService } from '../services/params.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

accesstocken:any;
  constructor(private params:ParamsService,private router:Router){

  }
  canActivate(
  ){

    if(this.getprofile())
    {
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }

  }


  getprofile(){
this.accesstocken=this.params.getparam('accesstocken');
    return this.accesstocken!=null;
  }

}
