

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { param } from 'jquery';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit{
  error:any;
  success:any;
  token:any;
  myparam:any;
  constructor(private authservice:AuthService,private router:Router,private route: ActivatedRoute){}
  ngOnInit(): void {

    this.error=null;
    this.success=null;
    this.route.queryParams
      .subscribe(param=> {
        this.myparam=param;

this.token=this.myparam.token;
console.log(this.token);


    })
  }

    changePassword(form:any){




      // form.value.user_id=this.authservice.getUserId();

      console.log(form.value);
  if(form.value.password==form.value.c_password){


    this.authservice.changePasswordForgot(form.value).subscribe(res=>{
      this.success=1;
  console.log(res);

  setTimeout(() => {
    this.router.navigate(['login']);
  }, 3000);


    },error=>{
      console.log(error);
      this.error=error.error.message;

    })
  }else{
  this.error= "passwords does not match";
  }


    }

}
