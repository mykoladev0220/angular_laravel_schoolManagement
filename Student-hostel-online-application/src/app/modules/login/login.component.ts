import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { Student } from '@/models/student';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    loading: any;
    error: any;
    studentdetails: any;
    student = new Student();


    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router,
        private auhthservice: AuthService,
        private encservice: EncriprionserviceService,
        private params:ParamsService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        // this.loginForm = new UntypedFormGroup({
        //     email: new UntypedFormControl(null, Validators.required),
        //     password: new UntypedFormControl(null, Validators.required)
        // });
    }

    async loginByAuth(form:any) {

      console.log(this.student);
      if(this.student.reg_number==null){
        this.error='registration number is required '

      }else if(this.student.password==null){
        this.error='passwod is required '
      }else{
        console.log("tapinda");
        console.log(this.student);
        this.auhthservice.login(this.student).subscribe(
          (res) => {
            console.log(res);

            this.studentdetails = res;

            this.params.setparam('accesstocken',this.encservice.encrypt(this.studentdetails.access_token));
            this.params.setparam('hasapplied', this.encservice.encrypt(JSON.stringify(this.studentdetails.hasapplied)));
            this.params.setparam('student',this.encservice.encrypt(JSON.stringify(this.studentdetails.student)));






            this.loading = false;

            this.router.navigate(['home']);
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

    hideError() {
      this.error = null;
    }



    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}