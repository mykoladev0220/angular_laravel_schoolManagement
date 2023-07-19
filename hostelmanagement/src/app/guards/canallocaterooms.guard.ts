import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ParamsService } from '../services/params.service';

@Injectable({
  providedIn: 'root'
})
export class CanallocateroomsGuard implements CanActivate {
  canallocate=false;
  canapprove=false;
  constructor(private params:ParamsService,private router:Router)
{}
  canActivate(){
if(this.getright()){
  return true;
}else{
  this.router.navigate(['hostels']);
  return false;
}


  }
  getright(){

    var myrights=this.params.getparam('myrights');
    this.canallocate=myrights.allocate_rooms;
    this.canapprove=myrights.approve_allocations;
    return this.canallocate || this.canapprove;
      }

}
