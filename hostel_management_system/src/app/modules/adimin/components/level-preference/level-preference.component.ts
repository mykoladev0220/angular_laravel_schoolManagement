import { Levelpreference } from './../../../../models/levelpreference.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserRights } from 'src/app/models/user-rights.model';
import { AuthService } from 'src/app/services/auth.service';
import { LevelpreferenceService } from 'src/app/services/levelpreference.service';
import { LevelsService } from 'src/app/services/levels.service';
import { ParamsService } from 'src/app/services/params.service';
import { ToastService } from 'src/app/services/toast.service';
import { YearserviceService } from 'src/app/services/yearservice.service';

@Component({
  selector: 'app-level-preference',
  templateUrl: './level-preference.component.html',
  styleUrls: ['./level-preference.component.css'],
})
export class LevelPreferenceComponent implements OnInit {
  feddback_message_status: any;
  preferences: any;
  msg: any;
  residence_session: any;
  feedback_message: any;
  dtoptions: DataTables.Settings = {};
  levelpreference = new Levelpreference();
  myrights = new UserRights();
  dtTrigger: Subject<any> = new Subject<any>();
  levels: any;
  years: any;
  myressponse:any;

  constructor(
    private params: ParamsService,
    private authservice: AuthService,
    private levelservice: LevelsService,
    private yearservice: YearserviceService,
    private levelpreferenceservice: LevelpreferenceService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.levelpreference.academic_level='';
    this.levelpreference.semester='';
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      language: {
        searchPlaceholder: 'search',
      },
destroy:true,
    };
    this.residence_session = this.params.getparam('batch');

    this.getlevel();
    this.getYears();
    this.getLevelPreferences();
  }
  CreatePrefernce() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.levelpreference.residence_session_id =
      this.residence_session.residence_session_id;
    this.levelpreferenceservice
      .CreateLevelPerefernce(this.levelpreference, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {
          this.myressponse=res;
          this.preferences=this.myressponse.levels;
          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = ;
          this.toast.firesuccess(this.msg.message);
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(error.error.message)

        }
      );
  }

  removePreference(preference:any) {

    this.levelpreference=preference;
    this.levelpreferenceservice
      .removeLevelPreference(this.levelpreference, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {

          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = this.msg.message;
          this.toast.firesuccess(this.msg.message);
          this.myressponse=res;
          this.preferences=this.myressponse.levels;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);

        },
        (error) => {

          this.toast.fireError(error.error.message)
        }
      );
  }

  getLevelPreferences() {
    this.levelpreferenceservice
      .getLevelPreference(
        { residence_session_id: this.residence_session.residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.preferences = res;
        this.dtTrigger.next(null);
      });
  }

  getlevel() {
    this.levelservice
      .getlevels({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.levels = res;
        console.log(this.levels);
      });
  }

  getYears() {
    this.yearservice
      .getyears({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.years = res;
        console.log(this.years);
      });
  }
}
