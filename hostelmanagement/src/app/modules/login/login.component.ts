
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParamsService } from '@services/params.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userrole: any;
  user:any;
  error:any;
  success:any;
  response:any;
  rights:any;
  rightarr = new Array();
  constructor(private authService: AuthService, private router: Router,private paramservice:ParamsService) {}
  ngOnInit(): void {
    this.error=null;
    this.success=null;

  }
  logout() {
    if (this.authService.authenticated()) {
      this.authService.logout();
    }
  }

  login(form: NgForm) {
    this.error=null;
    this.success=null;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login({ email: email, password: password }).subscribe(
      (res) => {
      this.paramservice.setparam('user',res);
console.log(res);

        this.userrole = this.authService.getRole();
        this.user=res;

this.success=1;
var myrights=this.user.myrights;
if( myrights=this.user.myrights==null){
  this.success=null;
  this.error="currently you do not have rights in the system please contact your administrator";
}
else{




  this.paramservice.setparam("myrights",JSON.parse(this.user.myrights.rights));

  

         this.router.navigate(['hostels']);



      }
      },
      (error) => {
        this.error=error.error.message;

        console.log(error);

      }
    );
  }
}
