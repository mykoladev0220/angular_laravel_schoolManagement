import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { UserRights } from 'src/app/models/user-rights.model';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  authenticated:any;
  role:any;
  userrole:any;
  myrights=new UserRights();
  constructor(private authservice:AuthService,private router:Router,private param:ParamsService){
    this.router.events.subscribe((event) => {

      // console.log("change detected");

      this.authenticated=this.authservice.authenticated();
      this.role=this.authservice.getRole();
      this.userrole=this.authservice.getRole();

    });
  }

  ngOnInit(): void {

this.myrights=this.param.getparam('myrights');

console.log(this.myrights);

  }



}
