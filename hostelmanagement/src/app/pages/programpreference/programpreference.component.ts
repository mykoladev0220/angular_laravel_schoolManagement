import { ProgramPreference } from "@/models/program-preference";
import { UserRights } from "@/models/user-rights";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { LevelpreferenceService } from "@services/levelpreference.service";
import { ParamsService } from "@services/params.service";
import { ProgrampreferenceService } from "@services/programpreference.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-programpreference',
  templateUrl: './programpreference.component.html',
  styleUrls: ['./programpreference.component.scss'],
})
export class ProgrampreferenceComponent implements OnInit {
  feddback_message_status: any;
  preferences: any;
  preference_level_id:any;
  msg: any;
  programmesessions:any;
  programme_code: any;
  residence_session: any;
  programlist: any;
  feedback_message: any;
  dtoptions: any= {};
  programpreference = new ProgramPreference();
  myrights = new UserRights();
  dropdownList = [{}];
  selectedItems = [];
  dropdownSettings = {};
  preferencelevels:any

  myresponse: any;
  dtTrigger: Subject<any> = new Subject<any>();
  programes: any;
  constructor(
    private params: ParamsService,
    private authservice: AuthService,

    private programsessionservice: ProgrampreferenceService,
    private preferencelevel:LevelpreferenceService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv' ,'excel' ,'pdf'
    ],
      language: {
        searchPlaceholder: 'search',
      },
destroy:true,
    };
    this.preference_level_id='';
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'programme_code',
      textField: 'programme_code',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.residence_session = this.params.getparam('batch');
    // this.getPrograms();
    this.getprogramesessions();
    this.getLevelPreferences();
  }



  getLevelPreferences() {
    this.preferencelevel.getLevelPreference(
        { residence_session_id: this.residence_session.residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.preferencelevels= res;
        this.dtTrigger.next(null);
      });
  }
  deleteProgrammeSession(programpreference:any){

    this.programpreference=programpreference;
this.programsessionservice.removeProgramPreference(this.programpreference, {
  headers: this.authservice.getHeaders(),
}).subscribe( (res) => {

  this.myresponse=res;



  this.programmesessions=this.myresponse.programe_session;

  this.toast.firesuccess(this.myresponse.message);
  var table=$('#mytable').DataTable();
  table.destroy();
  this.dtTrigger.next(null);

},
(error) => {
  this.toast.fireError(error.error.message);

})
  }
getprogramesessions(){
  this.programsessionservice.getallprogramPreference(this.residence_session,  {
    headers: this.authservice.getHeaders(),
  }).subscribe(res=>{

    this.programmesessions=res;

    var table=$('#mytable').DataTable();
    table.destroy();
    this.dtTrigger.next(null);
  },error=>{
    console.log(error);

  })
}

  createprogrampreference() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    console.log(this.preference_level_id);

    this.programsessionservice

      .CreateprogramPreference(
        {

          createdby: this.authservice.getUserId(),
          residence_session_id: this.residence_session.residence_session_id,
          preference_level_id:this.preference_level_id,
          programlist: this.programlist,

        },
        {
          headers: this.authservice.getHeaders(),
        }
      )
      .subscribe(
        (res) => {
          this.programlist = null;
          this.myresponse=res;


          this.programes=this.myresponse.programmestoadd;
          this.programmesessions=this.myresponse.programe_session;

          this.toast.firesuccess(this.myresponse.message);

          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(error.error.message);

        }
      );
  }
  getPrograms() {

    this.programsessionservice
      .getallprogrammes(
        { residence_session_id: this.residence_session.residence_session_id,preference_level_id: this.preference_level_id },
        {
          headers: this.authservice.getHeaders(),
        }
      )
      .subscribe(
        (res) => {
          this.programes = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
