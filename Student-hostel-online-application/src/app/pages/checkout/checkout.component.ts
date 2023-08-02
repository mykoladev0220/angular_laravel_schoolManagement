import { Checkout } from '@/models/checkout.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CheckcheckoutService } from '@services/checkcheckout.service';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';
import { ToastService } from '@services/toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  implements OnInit{
  residenceSession:any;
  batchallocations_appproved:any;

  dtoptions:any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  checkoutmodel= new Checkout();
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
    this.getCheckoutData();
  }

  getCheckoutData() {
    this.checkservice.getCheckoutdata
      (
      this.residenceSession,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.msg = res;



          this.batchallocations_appproved = this.msg.checkoutdata;
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
  checkout(allocation:any){
    this.checkoutmodel=allocation;
    this.checkoutmodel.date_checked=this.datechecked;
    this.checkoutmodel.checked_by=JSON.parse(this.studentdatails).reg_number;

// console.log(this.checkoutmodel);

    this.checkservice.Checkout( this.checkoutmodel,
      { headers: this.authservice.getHeaders() }).subscribe(res=>{
        this.msg=res;

        this.getCheckoutData();
this.toast.firesuccess(this.msg.message);
      },error=>{
        console.log(error.error.message);

        this.toast.fireError(error.error.message);
      })
  }
}
