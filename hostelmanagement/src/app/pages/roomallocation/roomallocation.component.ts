import { Roomallocation } from "@/models/roomallocation";
import { UserRights } from "@/models/user-rights";
import { Component, OnInit } from "@angular/core";
import { ActiveperiodsService } from "@services/activeperiods.service";
import { AuthService } from "@services/auth.service";
import { BatchesService } from "@services/batches.service";
import { ParamsService } from "@services/params.service";
import { RoomallocationService } from "@services/roomallocation.service";
import { StudentService } from "@services/student.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";



@Component({
  selector: 'app-roomallocation',
  templateUrl: './roomallocation.component.html',
  styleUrls: ['./roomallocation.component.scss'],
})
export class RoomallocationComponent  implements OnInit{
  batch: any;
  reserved=false;
  activeperiodid: any;
  searchreg_number:any;
  batchallocations_appproved: any;
  batchallocations_pending: any;
  feddback_message_status: any;
  msg: any;
  $reg_number: any;
  roomgender: any;
  room_type_id: any;
  roomstoallocate: any;
  residence_session_id: any;
  feedback_message: any;
  myrights=new UserRights();
  count=0;
error:any;
  periods: any;
  userrole: any;
  residenceSession: any;
  mystudent:any={};
  dtoptions: DataTables.Settings = {};
  
  rejection_reason:any;

  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
   dtTrigger3: Subject<any> = new Subject<any>();
  roomallocation = new Roomallocation();
  active_period_id: any;

  ngOnInit(): void {
  //  console.log(this. mystudent.surname);

    this.dtoptions = {
      searching: true,

      pageLength: 5,

      lengthChange: true,

      language: {
        searchPlaceholder: 'search',
      },
      destroy: true,
      responsive: true,
      dom: 'Bfrtip',
    };
// this.student=null;

    this.myrights=this.params.getparam('myrights');
    this.userrole = this.authservice.getRole();

    this.roomgender = 'm';
    this.residenceSession = this.params.getparam('batch');
    this.residence_session_id = this.residenceSession.residence_session_id;
    this.active_period_id = this.residenceSession.active_period_id;
    this.getroomsToallocate();
    this.getRoomsallocations();
  }
  constructor(
    private authservice: AuthService,
    private roomallocationservice: RoomallocationService,
    private params: ParamsService,
    private activeperiodservice: ActiveperiodsService,
    private batchesService: BatchesService,
    private studentd:StudentService,
    private toast:ToastService
  ) {}


  getRoomsallocations() {
    this.roomallocationservice
      .getRoomallocation(
        { residence_session_id: this.residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg = res;
          // console.log(res);

          this.batchallocations_appproved = this.msg.allocations_appproved;
          this.batchallocations_pending = this.msg.allocations_pending;
          var table2=$('#mytable2').DataTable();
          table2.destroy();
          var table3=$('#mytable3').DataTable();
          table3.destroy();


          this.dtTrigger2.next(null);
          this.dtTrigger3.next(null);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getroomsToallocate() {

      var data = {
        room_gender: this.roomgender,
        batch_id: this.residence_session_id,
        active_period_id: this.active_period_id,
        reserved:this.reserved
      };
      this.roomallocationservice
        .getroomstoallocate(data, { headers: this.authservice.getHeaders() })
        .subscribe(
          (res) => {
            this.roomstoallocate = res;
            var table1=$('#mytable1').DataTable();
            table1.destroy();



            this.dtTrigger1.next(null);


          },
          (error) => {
            console.log(error);
          }
        );



  }
  setroomid(room_id: any) {
    this.roomallocation.room_id = room_id;
  }
getstudentDetails(regnumber:any){
  this.error="";
this.studentd.studentDetails({reg_number:regnumber}, {
  headers: this.authservice.getHeaders(),
}).subscribe(
  res=>{
console.log(res);


this.msg=res;
this.roomallocation.reg_number=this.msg[0].reg_number;
this.mystudent=this.msg[0];

  },error=>{
    this.error=error.error.message;

  }
)
}
  approve_reject(status: any, room_allocation: any) {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    var data = {
      approved_status: status,
      room_id:room_allocation.room_id,
      residence_session_id: this.residenceSession.residence_session_id,
      room_allocation_id: room_allocation.room_allocation_id,
      reason:this.rejection_reason,
      userid:this.authservice.getUserId()
    };
    console.log(data);

    this.roomallocationservice
      .approve_reject(data, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {
          console.log(res);

this.msg=res;

          this.batchallocations_appproved = this.msg.allocations_appproved;


          this.batchallocations_pending = this.msg.allocations_pending;
          var table2=$('#mytable2').DataTable();
          table2.destroy();
          var table3=$('#mytable3').DataTable();
          table3.destroy();

          this.dtTrigger2.next(null);
          this.dtTrigger3.next(null);
          this.getroomsToallocate();
          this.toast.firesuccess(this.msg.message)

        },
        (error) => {
          console.log(error);
this.toast.fireError(error.error.message);

        }
      );
  }

  allocateRooms() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.roomallocation.active_period_id =
      this.residenceSession.active_period_id;
    this.roomallocation.allocated_by = this.authservice.getUserId();
    this.roomallocation.residence_session_id =
      this.residenceSession.residence_session_id;


    this.roomallocationservice
      .allocateRooms(this.roomallocation, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {

          this.msg = res;
          this.toast.firesuccess(this.msg.message)
      this.getRoomsallocations()
      this.getroomsToallocate();
        },
        (error) => {
this.toast.fireError(error.error.message)
       ;
        }
      );


  }
}
