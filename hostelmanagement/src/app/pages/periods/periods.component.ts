import { Activeperiods } from "@/models/activeperiods";
import { UserRights } from "@/models/user-rights";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActiveperiodsService } from "@services/activeperiods.service";
import { AuthService } from "@services/auth.service";
import { LevelsService } from "@services/levels.service";
import { ParamsService } from "@services/params.service";
import { PeriodsService } from "@services/periods.service";
import { ToastService } from "@services/toast.service";
import { YearserviceService } from "@services/year.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
})
export class PeriodsComponent implements OnInit {
  activeperiod = new Activeperiods();
  periods: any;
  active_periods: any;
  levels: any;
  years: any;
  feedback_status: any;
  feedbackmsg: any;
  result: any;
  batches: any;
  userrole: any;
  myrights=new UserRights();
  date = new Date();
  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  activeperiods: any = new Activeperiods();

  constructor(
    private activeperiodservice: ActiveperiodsService,
    private authservice: AuthService,
    private router: Router,
    private periodservice: PeriodsService,
    private yearservice: YearserviceService,
    private levelservice: LevelsService,
    private paramsservice: ParamsService,
    private toast:ToastService
  ) {}
  gotoBatches(activeperiod: any) {
    this.paramsservice.setparam('activeperiod', activeperiod);
    this.router.navigate(['batches']);
  }
  initfields() {
    this.activeperiod.level = '';
    this.activeperiod.semester = '';
    this.activeperiod.period_id = '';
  }
  ngOnInit(): void {
    this.myrights = this.paramsservice.getparam('myrights');
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      language: {
        searchPlaceholder: 'search',
      },
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ]
    };
    this.userrole = this.authservice.getRole();
    this.initfields();
    this.getActivePeriods();
    this.getperiods();
    this.getlevels();
    this.getyears();
  }
  deactivate(period:any) {
    this.feedback_status = 0;
    this.activeperiodservice
      .deactivateActiveperiod(
    period,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {

          this.result = res;
          this.toast.firesuccess(this.result.message)
          this.active_periods = this.result.periods;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {

          this.toast.fireError(error.error.message)
        }
      );
  }
  getperiods() {
    this.periodservice
      .getperiods({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.periods = res;
      });
  }
  createActivePeriod() {
    this.activeperiod.is_active = '0';
    this.activeperiod.activated_by = this.authservice.getUserId();
    this.feedback_status = '';

    this.feedbackmsg = '';
    if (this.activeperiod.end_date <= this.activeperiod.start_date) {
      // this.feedback_status = 2;
      // this.feedbackmsg = ' ';
      this.toast.fireError('end date must be greater start date');
    } else {
      this.activeperiodservice
        .createActiveperiod(this.activeperiod, {
          headers: this.authservice.getHeaders(),
        })
        .subscribe(
          (res) => {
            // this.feedback_status = 1;
            this.result = res;

            // this.feedbackmsg = ;
            this.toast.firesuccess(this.result.message)
            this.active_periods = this.result.periods;
            var table=$('#mytable').DataTable();
            table.destroy();
            this.dtTrigger.next(null);
          },
          (error) => {
            this.toast.fireError(error.error.message);
          }
        );
    }
  }
  activate(period:any) {


    this.feedback_status = 0;
    this.activeperiodservice
      .activateActiveperiod(
        period,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          this.result = res;
          this.toast.firesuccess(this.result.message)

          this.active_periods = this.result.periods;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(error.error.message);
        }
      );
  }
  delete(period:any) {
    console.log(period);

    this.feedback_status = 0;
    this.activeperiodservice
      .deleteActiveperiod(
     period,
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {

          this.result = res;
          this.toast.firesuccess(this.result.message)
          this.active_periods = this.result.periods;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError(error.error.message);

        }
      );
  }

  updateactiveperiod() {
    this.feedback_status = 0;
    this.activeperiodservice
      .updateActtivePeriod(this.activeperiods, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {


          this.result = res;

          this.toast.firesuccess(this.result.message)
          this.active_periods = this.result.periods;
        },
        (error) => {
          this.toast.fireError(error.error.message);
        }
      );
  }

  setcreds(activeperiod: any) {
    this.activeperiods = activeperiod;
    this.activeperiods.level = parseInt(activeperiod.level);
    this.activeperiods.semester = parseInt(activeperiod.semester);
  }
  getyears() {
    this.yearservice
      .getyears({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.years = res;
      });
  }
  getlevels() {
    this.levelservice
      .getlevels({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.levels = res;
      });
  }
  getActivePeriods() {
    this.activeperiodservice
      .getActivePeriod({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.active_periods = res;

        console.log(res);

        this.dtTrigger.next(null);
      },error=>{
        console.log(error);

      });
  }
}
