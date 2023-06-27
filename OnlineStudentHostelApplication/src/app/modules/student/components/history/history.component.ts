import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { EncriprionserviceService } from 'src/app/services/encriprionservice.service';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  feedback_message_status: any;
  feedback_message: any;
  batches: any;
  myresponse:any;
  level: any;
  myallocations: any;
  myapplication:any;
  semester: any;
  period_id: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  studentdatails: any;
  studentdatails1: any;
  programme_code:any;

  constructor(
    private applicationservice: ApplicationService,

    private authservice: AuthService,
    private ennceservice: EncriprionserviceService,
    private param:ParamsService
  ) {}
  ngOnInit(): void {
    this.studentdatails = this.param.getparam('student');
    this.studentdatails1 = this.ennceservice.decrypt(this.studentdatails);
    // console.log(this.studentdatails);

    this.level = JSON.parse(this.studentdatails1).academic_level;

    this.semester = JSON.parse(this.studentdatails1).semester;
    this.period_id = JSON.parse(this.studentdatails1).period_id;
this.programme_code=JSON.parse(this.studentdatails1).programme_code;
 this.getMyAllocation();
  }


  getMyAllocation() {

    var regnumber = JSON.parse(this.studentdatails1).reg_number;
    this.applicationservice
      .getMyallocation(
        { regnumber: regnumber },
        {
          headers: this.authservice.getHeaders(),
        }
      )
      .subscribe((res) => {
        // console.log(res);
this.myresponse=res;
this.myapplication=this.myresponse.myapplication;


        this.myallocations = this.myresponse.myallocation


// console.log(this.myapplication);



        this.dtTrigger.next(null);
      });
  }

}
