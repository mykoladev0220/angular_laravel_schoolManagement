import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
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
