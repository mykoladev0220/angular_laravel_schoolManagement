
import { Checkin } from '@/models/checkin.model';
import { UserRights } from '@/models/user-rights';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ChekckCheckoutService } from '@services/chekck-checkout.service';
import { ParamsService } from '@services/params.service';
import { RoomallocationService } from '@services/roomallocation.service';
import { StudentService } from '@services/student.service';
import { ToastService } from '@services/toast.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  residenceSession:any;
  batchallocations_appproved:any;
  myrights=new UserRights();
  dtoptions:any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  checkinmodel= new Checkin();
  datechecked:Date;
  receipt_number:string;

  msg:any;
  constructor(
    private authservice: AuthService,
    private checkservice:ChekckCheckoutService,
    private params: ParamsService,
    private studentd:StudentService,
    private toast:ToastService
  ){}
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
    this.residenceSession = this.params.getparam('batch');
    this.getCheckInData();
  }

  getCheckInData() {
    this.checkservice.getcheckindata
      (
      this.residenceSession,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg = res;


          this.batchallocations_appproved = this.msg.allocations_appproved;
          console.log( this.batchallocations_appproved);
          var table2=$('#mytable').DataTable();
          table2.destroy();



          this.dtTrigger.next(null);

        },
        (error) => {
          console.log(error);
        }
      );
  }
  checkin(allocation:any){
    this.checkinmodel=allocation;
    this.checkinmodel.date_checked=this.datechecked;
    this.checkinmodel.checked_by=this.authservice.getUserId();
    this.checkinmodel.receipt_number=this.receipt_number;

    this.checkservice.Checkin(  this.checkinmodel,
      { headers: this.authservice.getHeaders() }).subscribe(res=>{
        this.msg=res;
        this.getCheckInData();
this.toast.firesuccess(this.msg.message);
      },error=>{
        this.toast.fireError(error.error.message);
      })
  }

}
