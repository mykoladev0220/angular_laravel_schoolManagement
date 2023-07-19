import { Checkin } from '@/models/checkin.model';
import { Checkout } from '@/models/checkout.model';
import { UserRights } from '@/models/user-rights';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ChekckCheckoutService } from '@services/chekck-checkout.service';
import { ParamsService } from '@services/params.service';
import { StudentService } from '@services/student.service';
import { ToastService } from '@services/toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkout-report',
  templateUrl: './checkout-report.component.html',
  styleUrls: ['./checkout-report.component.scss']
})
export class CheckoutReportComponent implements OnInit{
  residenceSession:any;
  batchallocations_appproved:any;
  myrights=new UserRights();
  dtoptions:any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  checkoutmodel= new Checkout();
  datechecked:Date;
  receipt_number:string;

  msg:any;
  constructor(
    private authservice: AuthService,
    private checkservice:ChekckCheckoutService,
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
    this.getCheckoutreportData();
  }

  getCheckoutreportData() {
    this.checkservice.getCheckoutreportdata
      (
      this.residenceSession,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg = res;


          this.batchallocations_appproved = this.msg.checkoutreportdata;
         
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
