import { Floor } from '@/models/floor';
import { UserRights } from '@/models/user-rights';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FloorService } from '@services/floor.service';
import { HostelService } from '@services/hostel.service';
import { ParamsService } from '@services/params.service';
import { ToastService } from '@services/toast.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss'],
})
export class FloorsComponent implements OnInit,OnDestroy {
  dtoptions:any = {};
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
    private authservice: AuthService,
    private toast:ToastService
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
        searchPlaceholder: 'search',
      },
      destroy:true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ]
    };
    this.floor.floor_name="ground";
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

          this.msg = res;

this.toast.firesuccess(this.msg.message);
          this.floors = this.msg.floors;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {

          this.toast.fireError(error.error.message);
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
          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = this.msg.message;
          this.toast.firesuccess(this.msg.message)
          this.floors = this.msg.floors;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(error.error.message);

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
