import { Subject } from 'rxjs';
import { ParamsService } from './../../../../services/params.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Floor } from 'src/app/models/floor';
import { FloorService } from 'src/app/services/floor.service';
import { HostelService } from 'src/app/services/hostel.service';
import { AuthService } from 'src/app/services/auth.service';

import { UserRights } from 'src/app/models/user-rights.model';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css'],
})
export class FloorsComponent implements OnInit,OnDestroy {
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostels: any;
  _hostel_id: any;
  floor = new Floor();
  floors: any;
  feddback_message_status: any;
  msg: any;
  feedback_message: any;
  userrole: any;
  myrights=new UserRights();
  constructor(
    private hostelservice: HostelService,
    private paramsService: ParamsService,
    private floorservice: FloorService,
    private authservice: AuthService
  ) {}
  ngOnDestroy(): void {

   this.dtTrigger.unsubscribe();
  }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer',
      },
      destroy:true
    };
    this.floor.floor_name="groundy";
        this.myrights=this.paramsService.getparam('myrights');
    this.userrole = this.authservice.getRole();
    this.getHostel();
    this.getfloors();
  }
  getHostel() {
    this.hostelservice
      .getHostels({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.hostels = res;
      });
    this.floor.hostel_id = this.paramsService.getparam('hostel').hostel_id;

  }

  createFloors(form: any) {
    this.feddback_message_status = '';
    this.floorservice
      .addfloors(this.floor, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.feddback_message_status = 1;
          this.msg = res;
          this.feedback_message = this.msg.message;

          this.floors = this.msg.floors;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.feddback_message_status = 2;
          this.feedback_message = error.error.message;
        }
      );
  }
  deleteFloor(floor: any) {
    this.feddback_message_status = '';
    this.floor = floor;
    this.floorservice
      .deleteFloor(this.floor, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.feddback_message_status = 1;
          this.msg = res;
          this.feedback_message = this.msg.message;

          this.floors = this.msg.floors;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.feddback_message_status = 2;
          this.feedback_message = error.error.message;
        }
      );
  }
  getfloors() {
    this.floorservice
      .getFloor(
        { hostel_id: this.floor.hostel_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.floors = res;
        this.dtTrigger.next(null);
      });
  }
}
