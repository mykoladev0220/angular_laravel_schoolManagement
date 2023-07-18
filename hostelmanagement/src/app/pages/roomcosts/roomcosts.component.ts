import { UserRights } from "@/models/user-rights";
import { Component, OnInit } from "@angular/core";
import { ActiveperiodsService } from "@services/activeperiods.service";
import { AuthService } from "@services/auth.service";
import { ParamsService } from "@services/params.service";
import { RoomtypeService } from "@services/roomtype.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";


@Component({
  selector: 'app-roomcosts',
  templateUrl: './roomcosts.component.html',
  styleUrls: ['./roomcosts.component.scss']
})
export class RoomcostsComponent implements OnInit{
  roomTypes:any;
  feddback_message_status: any;
  msg: any;
  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  feedback_message: any;
periods:any;
roomTypeCost:any;
myrights=new UserRights();
activeperiod:any;

  constructor(

    private authservice:AuthService,
    private roomtypeservice: RoomtypeService,
    private activeperiodservice:ActiveperiodsService,
    private params:ParamsService,
    private toast:ToastService,

  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      processing:true,
      //  paging:false

      lengthChange: false,
      language: {
        searchPlaceholder: 'search',
      },
      destroy: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ]
    };
    this.activeperiod= this.params.getparam('activeperiod');
    this.getroomtypeCosts(this.activeperiod.active_period_id);
    this.getroomtypes();
    this.getPeriods();
    this.myrights=this.params.getparam('myrights');
  }


  setRoomTypeCost(form:any)
  {
    this.feddback_message_status = 0;
    this.feedback_message = "";
   form.value.set_by= this.authservice.getUserId();
   console.log(form.value);

    this.roomtypeservice.setRoomcost(form.value,{headers:this.authservice.getHeaders()}).subscribe(res=>{
      var table=$('#mytable').DataTable();
      table.clear();
      // this.feddback_message_status=1;
      this.msg = res;

this.toast.firesuccess(this.msg.message)
      this.roomTypeCost=this.msg.roomcost

      table.destroy();
      this.dtTrigger.next(null);

    },error=>{
      this.toast.fireError(error.error.message)

    });
  }
  filter(period_id:any)
  {
console.log(period_id.value);

  }
  getroomtypeCosts(active_period_id:any){


    console.log(active_period_id);

    this.feddback_message_status = 0;
    this.feedback_message = "";
    this.roomtypeservice.getRoomcost({active_period_id:active_period_id},{headers:this.authservice.getHeaders()}).subscribe(res=>{
this.roomTypeCost=res;
console.log(res);


    },error=>{
      this.feddback_message_status = 2;
          console.log(error);

    })
  }
  getroomtypes(){
    this.feddback_message_status = 0;
    this.feedback_message = "";
this.roomtypeservice.getRoomType({headers:this.authservice.getHeaders()}).subscribe(res=>{
this.roomTypes=res;
this.dtTrigger.next(null)

},error=>{
  this.feddback_message_status = 2;
        this.feedback_message = "server error";
})
  }
  getPeriods(){
    this.feddback_message_status = 0;
    this.feedback_message = "";
this.activeperiodservice.getActivePeriod({headers:this.authservice.getHeaders()}).subscribe(res=>{
this.periods=res;

},error=>{
  this.feddback_message_status = 2;
        this.feedback_message = "server error";
})
  }
}
