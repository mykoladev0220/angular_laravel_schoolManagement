import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,

} from '@angular/router';
import { Observable } from 'rxjs';
import { EncriprionserviceService } from '../services/encriprionservice.service';
import { ParamsService } from '../services/params.service';

@Injectable({
  providedIn: 'root',
})
export class HasappliedGuard implements CanActivate {
  student: any;
  has_applied: any;
  subwarden:any;
  subwarden_batch:any;
  sessionbatch:any;

  constructor(
    private router: Router,
    private encservice: EncriprionserviceService,
    private params:ParamsService
  ) {}

  canActivate() {
    if (this.gethasapplied() != '0') {

      if(this.getsubwarden()!="null"){
        this.router.navigate(['checkin']);

      }
    else{
      this.router.navigate(['history']);

    }
    return false;
    }

     else {
      return true;
    }
  }

  getsubwarden(){
    this.subwarden= this.params.getparam('subwarden');
this.subwarden_batch=JSON.parse(this.encservice.decrypt(this.subwarden));
this.sessionbatch=JSON.parse(this.encservice.decrypt(this.params.getparam('mybatch')));


if(this.subwarden_batch.residence_session_id!=this.sessionbatch.residence_session_id){



return "null";
}
else{
  return this.encservice.decrypt(this.subwarden);
}

  }
  gethasapplied() {

    this.has_applied = this.params.getparam('hasapplied');

    return this.encservice.decrypt(this.has_applied);
  }
}
