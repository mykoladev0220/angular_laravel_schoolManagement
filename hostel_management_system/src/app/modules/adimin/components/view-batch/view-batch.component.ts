import { HostelpreferenceService } from './../../../../services/hostelpreference.service';
import { ParamsService } from './../../../../services/params.service';
import { Hostel } from './../../../../models/hostel.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';
import { HostelService } from 'src/app/services/hostel.service';
import { LocationService } from 'src/app/services/location.service';
import { Hostelpreference } from 'src/app/models/hostelpreference';
import { UserRights } from 'src/app/models/user-rights.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css'],
})
export class ViewBatchComponent implements OnInit {
  feddback_message_status: any;

  msg: any;

  feedback_message: any;
  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  locations: any;
  hostels: any;
  floors: any;
  location_id: any;
  hostel_id: any;
  myrights= new UserRights();
  residence_session: any;
  hostelpreference = new Hostelpreference();
  floor_id: any;
  batchhostels: any;
  constructor(
    private params: ParamsService,
    private hostelservice: HostelService,
    private authservice: AuthService,
    private floorservice: FloorService,
    private hostelprefernceservice: HostelpreferenceService,
    private locationservice: LocationService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.residence_session = this.params.getparam('batch');


    this.hostelpreference.hostel_id = '';
    this.hostelpreference.floor_id = '';
    this.location_id = '';
    this.hostel_id = '';
    this.floor_id = '';
this.myrights= this.params.getparam('myrights');
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      pageLength: 5,
      lengthChange: true,
      language: {
        searchPlaceholder: 'search',
      },
      destroy: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ]
    };
this. getBatchHostels();
    this.getlocations();
  }

  getfloors(hostel_id: any) {
    this.hostelpreference.floor_id = '';
    var residence_session_id = this.residence_session.residence_session_id;

    this.floorservice
      .getBatchFloor(
        { hostel_id: hostel_id, residence_session_id: residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.floors = res;
      });
  }
  removeHostel(hostel:any)
{
  this.feddback_message_status = 0;
  this.feedback_message = "";

this.hostelprefernceservice.deletehostelpreference(hostel,{ headers: this.authservice.getHeaders() }).subscribe(
  (res) => {

    this.msg = res;

    this.toast.firesuccess(this.msg.message)
    this.getfloors(this.hostelpreference.hostel_id);
this.getBatchHostels();


  },
  (error) => {
    this.toast.fireError(error.error.message)

  }
);
}

  setHostelPreference() {
    this.feddback_message_status = 0;
    this.feedback_message = '';

    this.hostelpreference.residence_session_id =
      this.residence_session.residence_session_id;
    this.hostelpreference.activated_by = this.authservice.getUserId();
    this.hostelpreference.active_period_id =
      this.residence_session.active_period_id;


    this.hostelprefernceservice
      .sethostelpreference(this.hostelpreference, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {



          this.msg = res;
          this.toast.firesuccess(this.msg.message);
          this.getfloors(this.hostelpreference.hostel_id);
          this.getBatchHostels();

        },
        (error) => {
          console.log(error);
this.toast.fireError(error.error.message)

        }
      );
  }
  getBatchHostels(){

    this.hostelprefernceservice.gethostelpreference({residence_session_id:this.residence_session.residence_session_id},{headers:this.authservice.getHeaders()}).subscribe(
      res=>{
  this.batchhostels=res;
  var table=$('#mytable').DataTable();
  table.destroy();
  this.dtTrigger.next(null);





      },error=>{
        console.log(error);

      }
    )
  }

  getHostels(location_id: any) {
    this.hostelpreference.hostel_id = '';
    this.hostelpreference.floor_id = '';

    this.hostelservice
      .findHostels(
        { location_id: location_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        console.log(res);
        this.hostels = res;

      });
  }

  getlocations() {
    this.locationservice
      .getlocations({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        console.log(res);
        this.locations = res;
      });
  }
}
