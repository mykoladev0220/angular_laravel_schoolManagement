import { Batch } from "@/models/batch";
import { Resavation } from "@/models/resavation";
import { UserRights } from "@/models/user-rights";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActiveperiodsService } from "@services/activeperiods.service";
import { AuthService } from "@services/auth.service";
import { BatchesService } from "@services/batches.service";
import { ParamsService } from "@services/params.service";
import { RoomService } from "@services/room.service";
import { ToastService } from "@services/toast.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

@Component({
  selector: 'app-resavations',
  templateUrl: './resavations.component.html',
  styleUrls: ['./resavations.component.scss'],
})
export class ResavationsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })

  datatbleElement2: any = DataTableDirective;
  @ViewChild(DataTableDirective, { static: false })

  datatbleElement1: any = DataTableDirective;
  dtoptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  rooms: any;
  batches: any;
  session_batch: any;
  roomstoreserve: any;
toreservelist=[{}]
  active_Periods: any;
  resevation = new Resavation();

  feddback_message_status: any;
  msg: any;
  myrights = new UserRights();
  batchmodel = new Batch();
  feedback_message: any;

  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      processing:true,
      //  paging:false

      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer',
      },
      destroy: true,
      dom: 'Bfrtip',

    };

 

    this.myrights = this.params.getparam('myrights');
    this.getAllBatch();

    this.activePedriods();
    this.session_batch = this.params.getparam('batch');

    if (this.session_batch == null) {
      this.batchmodel.active_period_id = '';
      this.batchmodel.residence_session_id = '';
    } else {
      this.batchmodel.active_period_id = this.session_batch.active_period_id;
      this.batchmodel.residence_session_id =
        this.session_batch.residence_session_id;
      this.getroomsToresereve();
      this.findResavation(this.session_batch.residence_session_id);
    }
  }
  constructor(
    private authservice: AuthService,
    private roomservice: RoomService,
    private params: ParamsService,
    private batchservice: BatchesService,
    private activeperiodservice: ActiveperiodsService,
    private toast:ToastService

  ) {

  }

  checkedsingle(room:any){
this.toreservelist.push(room);
  }
  getroomsToresereve() {
    this.roomservice
      .getRoomstoreserve(
        { residence_session_id: this.batchmodel.residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.roomstoreserve = res;
          this.dtTrigger1.next(null);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  activePedriods() {
    this.activeperiodservice
      .getActivePeriod({ headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.active_Periods = res;
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getBatches(active_period_id: any) {
    this.batchmodel.residence_session_id = '';

    this.batchservice
      .getBatches(
        { active_period_id: active_period_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.batches = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getAllBatch() {
    this.batchservice
      .getBatchesAll({ headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.batches = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reserve(room: any) {
    this.resevation = room;
    this.resevation.residence_session_id = this.batchmodel.residence_session_id;

    this.resevation.reserved_by = this.authservice.getUserId();

    this.roomservice
      .reserveRoom(this.resevation, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {

          this.msg = res;

          this.toast.firesuccess(this.msg.message)
           this.rooms=this.msg.resevedrooms;

          this.roomstoreserve = this.msg.roomstoreserve;



          var table=$('#mytable').DataTable();
table.destroy();
var table2=$('#mytable2').DataTable();
table2.destroy();
          this.dtTrigger1.next(null);
          this.dtTrigger2.next(null)


        },
        (error) => {
      this.toast.fireError(error.error.message)


        }
      );
  }

  batchChange() {
    this.findResavation(this.batchmodel.residence_session_id);
    this.getroomsToresereve();
  }

  unReserve() {
    console.log(this.resevation);

    this.roomservice
      .unReserveRoom(this.resevation, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {

          this.msg = res;

          this.rooms = this.msg.resevedrooms;
this.toast.firesuccess(this.msg.message)
          this.roomstoreserve = this.msg.roomstoreserve;
          var table=$('#mytable').DataTable();
          table.destroy();
          var table2=$('#mytable2').DataTable();
          table2.destroy();
                    this.dtTrigger1.next(null);
                    this.dtTrigger2.next(null)
        },
        (error) => {
          this.toast.fireError(error.error.message)


        }
      );
  }
  setRoom(room: any) {
    this.resevation = room;
  }
  findResavation(residence_session_id: any) {
    this.roomservice
      .findReservedRoom(
        { residence_session_id: this.batchmodel.residence_session_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg= res;
          this.rooms = this.msg.resevedrooms;

          this.roomstoreserve = this.msg.roomstoreserve;
          var table=$('#mytable').DataTable();
          table.destroy();
          var table2=$('#mytable2').DataTable();
          table2.destroy();
                    this.dtTrigger1.next(null);
                    this.dtTrigger2.next(null)
                    console.log('marine 2');

        },
        (error) => {
          console.log(error);

          this.feddback_message_status = 2;
          this.feedback_message = error.error.message;
        }
      );
  }

  getResevations() {
    this.roomservice
      .getReservedRoom({ headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.rooms = res;

          this.dtTrigger2.next(null);
        },
        (error) => {
          console.log(error);

          this.feddback_message_status = 2;
          this.feedback_message = error.error.message;
        }
      );
  }
}
