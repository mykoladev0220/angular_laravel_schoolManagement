import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';

import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  student:any
  studentname:any
  studentsurname:any;

    constructor(private encsercive:EncriprionserviceService,private params:ParamsService,private authservice:AuthService) {}

    ngOnInit(): void {
      this.student=this.params.getparam('student');
      this.student=JSON.parse(this.encsercive.decrypt(this.student));
      this.studentname=this.student.first_name;
      this.studentsurname=this.student.surname;
      console.log(this.student);
    }

    logout() {
        this.authservice.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
