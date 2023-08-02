import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssubwardenGuard implements CanActivate {


  subwarden:any;
  subwarden_batch:any;
  sessionbatch:any;

  constructor(
    private router: Router,
    private encservice: EncriprionserviceService,
    private params:ParamsService
  ) {}

  canActivate(){
  if( ! this.getsubwarden()){
  this.router.navigate(['home']);
return false
  }
  return true;
  }

  getsubwarden(){
    this.subwarden= this.params.getparam('subwarden');
this.subwarden_batch=JSON.parse(this.encservice.decrypt(this.subwarden));
this.sessionbatch=JSON.parse(this.encservice.decrypt(this.params.getparam('mybatch')));


return this.subwarden_batch.residence_session_id==this.sessionbatch.residence_session_id;

}


}
