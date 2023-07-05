import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { ParamsService } from '@services/params.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private params:ParamsService,private authservice:AuthService) {}

    ngOnInit(): void {
      this.user=this.params.getparam('user');
      this.user=this.user.user_details;
  
    }

    logout() {
        this.authservice.logout();
    }

}
