import { Hostel } from "@/models/hostel";
import { UserRights } from "@/models/user-rights";
import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { HostelService } from "@services/hostel.service";
import { LocationService } from "@services/location.service";
import { ParamsService } from "@services/params.service";
import { ToastService } from "@services/toast.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";


@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss'],
})
export class HostelsComponent implements OnInit {
  @ViewChild(DataTableDirective,{static:false})
  datatbleElement:any=DataTableDirective;
  dtoptions: any= {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostels: any;
  hostel = new Hostel();
  toastr: any;
  feddback_message_status: any;
  msg: any;
  locations: any;
  feedback_message: any;
  userrole: any;
  myrights=new UserRights();

  token = '';

  headers = new HttpHeaders();
  constructor(
    private hostelservice: HostelService,
    private router: Router,
    private locationservice: LocationService,
    private paramsservice: ParamsService,
    private authservice: AuthService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      pageLength: 5,
      lengthChange: true,
      language: {
        searchPlaceholder: 'search',
      },
      destroy:true,
      dom: 'Bfrtip',
      responsive:true,
      buttons: [
        'copy', 'csv', 'excel' ,'pdf'
    ]
    };
    this.userrole = this.authservice.getRole();
    this.getlocations();
    this.hostel.location_id = 1;
    this.getHostels();
    this.myrights = this.paramsservice.getparam('myrights');
  }
  createHostel() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.hostelservice
      .addHostels(this.hostel, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = ;
          this.toast.firesuccess(this.msg.message);
          this.hostels = this.msg.hostels;
          this.datatbleElement.dtInstance.then((dtInstance:DataTables.Api)=>dtInstance.destroy())
          this.dtTrigger.next(null);
        },
        (error) => {
this.toast.fireError(this.feedback_message = error.error.message);
          // this.feddback_message_status = 2;

        }
      );
  }

  updateHostel(hostel: any) {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    console.log(hostel);

    this.hostelservice
      .updateHostel(hostel, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {

          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = this.msg.message;
          this.toast.firesuccess(this.msg.message);
          this.hostels = this.msg.hostels;
          this.datatbleElement.dtInstance.then((dtInstance:DataTables.Api)=>dtInstance.destroy())
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(this.feedback_message = error.error.message);
        }
      );
  }
  setHostel_id(hostel_id: any) {
    this.hostel.hostel_id = hostel_id;
    console.log(this.hostel.hostel_id);
  }
  deleteHostel(hostel_id: any) {

    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.hostelservice
      .deleteHostel(
        { hostel_id: hostel_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {

          this.msg = res;

          this.hostels = this.msg.hostels;
          this.datatbleElement.dtInstance.then((dtInstance:DataTables.Api)=>dtInstance.destroy())
          this.dtTrigger.next(null);
          this.toast.firesuccess(this.msg.message);

        },
        (error) => {
          this.toast.fireError(this.feedback_message = error.error.message);
        }
      );
  }

  navigate(key: any, paramenter: any, path: any) {
    this.paramsservice.setparam(key, paramenter);
    this.router.navigate([path]);
  }

  getHostels() {
    this.hostelservice
      .getHostels({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        console.log(res);
        this.hostels = res;
        this.dtTrigger.next(null);
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
