import { EncriprionserviceService } from './../../services/encriprionservice.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';
import { ParamsService } from 'src/app/services/params.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: any;
  error: any;
  studentdetails: any;
  student = new Student();
  constructor(
    private router: Router,
    private auhthservice: AuthService,
    private encservice: EncriprionserviceService,
    private params:ParamsService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.error = null;
  }
  hideError() {
    this.error = null;
  }
  login(form: any) {
    this.loading = true;
    this.student = form.value;
    // console.log(this.student.reg_number);

    if(this.student.reg_number==null){
      this.error='registration number is required '

    }else if(this.student.password==null){
      this.error='passwod is required '
    }else{
      this.auhthservice.login(this.student).subscribe(
        (res) => {
          console.log(res);

          this.studentdetails = res;

          this.params.setparam('accesstocken',this.encservice.encrypt(this.studentdetails.access_token));
          this.params.setparam('hasapplied', this.encservice.encrypt(JSON.stringify(this.studentdetails.hasapplied)));
          this.params.setparam('student',this.encservice.encrypt(JSON.stringify(this.studentdetails.student)));






          this.loading = false;

          this.router.navigate(['student/home']);
          // window.location.href='student/home';
        },
        (error) => {
          console.log(error);

          this.error = error.error.message;

          this.loading = false;
        }
      );
    }

  }
}
