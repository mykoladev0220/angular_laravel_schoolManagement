import { Checkin } from '@/models/checkin.model';
import { UserRights } from '@/models/user-rights';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ChekckCheckoutService } from '@services/chekck-checkout.service';
import { ParamsService } from '@services/params.service';
import { StudentService } from '@services/student.service';
import { ToastService } from '@services/toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkin-report',
  templateUrl: './checkin-report.component.html',
  styleUrls: ['./checkin-report.component.scss']
})
export class CheckinReportComponent implements OnInit {
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
    this.checkservice.getCheckinreport
      (
      this.residenceSession,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg = res;


          this.batchallocations_appproved = this.msg.checkin_report;
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

}
