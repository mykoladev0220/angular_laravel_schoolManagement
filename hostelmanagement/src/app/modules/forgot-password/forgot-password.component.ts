import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  error:any;
  success:any;
  email:any;
  myresponse:any
  constructor(private authservice:AuthService,private router:Router){}
  ngOnInit(): void {

    this.error=null;
    this.success=null;

    }

    requestResert(){
      this.error=null;
      this.success=null;
      this.authservice.resertpassword({email:this.email}).subscribe(res=>{
        console.log(res);
        this.myresponse=res;
        this.success=this.myresponse.message;

      },error=>{
        this.error=error.error.message;
        console.log(error);

      })
    }
}
