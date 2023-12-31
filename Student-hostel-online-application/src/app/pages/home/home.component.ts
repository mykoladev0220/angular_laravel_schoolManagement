import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '@services/application.service';
import { AuthService } from '@services/auth.service';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
    private router: Router,
    private authservice: AuthService,
    private ennceservice: EncriprionserviceService,
    private param:ParamsService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      pageLength: 5,
      lengthMenu: [5, 10, 20],
      lengthChange: true,
      language: {
        searchPlaceholder: 'search',
      },
    };
    this.studentdatails = this.param.getparam('student');
    this.studentdatails1 = this.ennceservice.decrypt(this.studentdatails);
    // console.log(this.studentdatails);

    this.level = JSON.parse(this.studentdatails1).academic_level;

    this.semester = JSON.parse(this.studentdatails1).semester;
    this.period_id = JSON.parse(this.studentdatails1).period_id;
this.programme_code=JSON.parse(this.studentdatails1).programme_code;
    // console.log(this.studentdatails1);

    this.getBaches();




  }

  gotoApplication(batch: any) {


    this.param.setparam('mybatch', this.ennceservice.encrypt(JSON.stringify(batch)));
    this.router.navigate(['application']);
  }

  getBaches() {
    var data = {
      period_id: this.period_id,
      level: this.level,
      semester: this.semester,
      programme_code:this.programme_code
    };

    this.applicationservice
      .getMybatches(data, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {
          this.batches = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
