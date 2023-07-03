import { Injectable } from '@angular/core';
import { ParamsService } from '../services/params.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

accesstoken:any;
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
this.accesstoken=this.params.getparam('accesstocken');
    return this.accesstoken!=null;
  }

}
