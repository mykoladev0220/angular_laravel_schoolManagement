import { CheckcheckoutService } from './../../services/checkcheckout.service';
import { Checkin } from '@/models/checkin.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';
import { ToastService } from '@services/toast.service';
import { log } from 'console';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  residenceSession:any;
  batchallocations_appproved:any;
  dtoptions:any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  checkinmodel= new Checkin();
  datechecked:Date;
  receipt_number:string;

  msg:any;
  studentdatails: any;
  constructor(
    private authservice: AuthService,
    private checkservice:CheckcheckoutService,
    private params: ParamsService,
    private ennceservice: EncriprionserviceService,
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
    this.residenceSession = this.ennceservice.decrypt(this.params.getparam('mybatch'));
    this.studentdatails = this.ennceservice.decrypt(this.params.getparam('student'));
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
    this.checkinmodel.checked_by = JSON.parse(this.studentdatails).reg_number;
    this.checkinmodel.receipt_number=this.receipt_number;

    this.checkservice.Checkin(  this.checkinmodel,
      { headers: this.authservice.getHeaders() }).subscribe(res=>{
        this.msg=res;
        this.getCheckInData();
        this.toast.firesuccess(this.msg.message)


      },error=>{
        this.toast.fireError(error.error.message);
     
      })
  }
}
