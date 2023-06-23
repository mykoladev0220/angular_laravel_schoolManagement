import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ParamsService } from '../services/params.service';

@Injectable({
  providedIn: 'root'
})
export class CanblackliststudentsGuard implements CanActivate {
  canblacklist=false;
  constructor(private params:ParamsService,private router:Router){}
  canActivate(
  ) {
    if(this.getright()){
      return true;
    }else{
      this.router.navigate(['admin/hostels']);
      return false;
    }
  }

  getright(){

    var myrights=this.params.getparam('myrights');
    this.canblacklist=myrights.blacklist_students

    return this.canblacklist;
      }

  // {"create_hostel":true,"create_room_costs":true,"create_periods":true,"":true,"approve_allocations":true,
    // "create_users":true,"hostel_preference":true,"reserve_rooms":true,"":true}
}
