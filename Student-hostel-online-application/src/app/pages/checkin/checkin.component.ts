import { CheckcheckoutService } from './../../services/checkcheckout.service';
import { Checkin } from '@/models/checkin.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ParamsService } from '@services/params.service';
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
  constructor(
    private authservice: AuthService,
    private checkservice:CheckcheckoutService,
    private params: ParamsService,

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

    this.checkinmodel.receipt_number=this.receipt_number;

    this.checkservice.Checkin(  this.checkinmodel,
      { headers: this.authservice.getHeaders() }).subscribe(res=>{
        this.msg=res;
        this.getCheckInData();
console.log(this.msg.message);

      },error=>{
        console.log(this.msg.message);
      })
  }
}
