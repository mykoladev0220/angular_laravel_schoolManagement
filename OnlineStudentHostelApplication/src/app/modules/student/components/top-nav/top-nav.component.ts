import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EncriprionserviceService } from 'src/app/services/encriprionservice.service';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
student:any
  studentname:any
  studentsurname:any;
  ngOnInit(): void {
    this.student=this.params.getparam('student');
    this.student=JSON.parse(this.encsercive.decrypt(this.student));
    this.studentname=this.student.first_name;
    this.studentsurname=this.student.surname;



    // console.log(this.studentname);
    // console.log(this.studentsurname);


  }
  constructor(private encsercive:EncriprionserviceService,private params:ParamsService,private authservice:AuthService){


  }
logout(){
  this.authservice.logout();
}
}
