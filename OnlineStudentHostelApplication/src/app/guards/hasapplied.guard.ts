import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
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
  constructor(
    private router: Router,
    private encservice: EncriprionserviceService,
    private params:ParamsService
  ) {}

  canActivate() {
    if (this.gethasapplied() != '0') {
      this.router.navigate(['student/home']);
      return false;
    } else {
      return true;
    }
  }

  gethasapplied() {
    this.has_applied = this.params.getparam('hasapplied');

    return this.encservice.decrypt(this.has_applied);
  }
}
