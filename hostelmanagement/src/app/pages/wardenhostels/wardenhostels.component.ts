import { error } from 'jquery';
import { LocationService } from '@services/location.service';

import {Subwarden} from '@/models/subwarden.model';
import {UserRights} from '@/models/user-rights';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActiveperiodsService } from '@services/activeperiods.service';
import {AuthService} from '@services/auth.service';
import { BatchesService } from '@services/batches.service';
import {ParamsService} from '@services/params.service';
import {SubwardenService} from '@services/subwarden.service';
import {ToastService} from '@services/toast.service';

import { HostelService } from '@services/hostel.service';
import { log } from 'console';
import { Activeperiods } from '@/models/activeperiods';
import { Batch } from '@/models/batch';
import { Hostel } from '@/models/hostel';
import { WardernSession } from '@/models/wardern-session.model';

@Component({
    selector: 'app-wardenhostels',
    templateUrl: './wardenhostels.component.html',
    styleUrls: ['./wardenhostels.component.scss']
})
export class WardenhostelsComponent implements OnInit, OnDestroy {
    myrights = new UserRights();
    subwarden: any;
    asignments: any;
    subwardenreg:string;
    subwarden_id:number;
    subwardenmodel = new Subwarden();
    batches:any;
    hostels:any;
    locations:any;
    activeperiods:any;
    period:Activeperiods=null;
    location:any=null;
  subwarden_session= new WardernSession();

    resp: any;
    constructor(
        private paramservice: ParamsService,
        private subwardenservice: SubwardenService,
        private authservice: AuthService,
        private toast: ToastService,
        private activePeriodservice:ActiveperiodsService,
        private batchservice:BatchesService,
        private locationservice:LocationService,
        private hostelservice:HostelService
    ) {}
    ngOnInit(): void {
        this.subwarden = this.paramservice.getparam('subwarden');

this.subwardenreg=this.subwarden.reg_number;
        this.subwarden_id=this.subwarden.subwarden_id;
        this.getWardendetails();
        this.getlocation();
        this.getactivePeriods();
    }
    unAssign(assignment:any){
this.subwardenservice.unassignwarden(assignment,{headers: this.authservice.getHeaders()}).subscribe(
  res=>{
    this.resp=res;
    this.asignments = this.resp?.assignments;
this.toast.firesuccess(this.resp.message);
  },error=>{
this.toast.fireError(error.error.message);
  }
)
    }
     AssignWarden(){
      this.subwarden_session.assigned_by=this.authservice.getUserId();
      this.subwarden_session.subwarden_id=this.subwarden_id;
      this.subwarden_session.reg_number=this.subwardenreg;
this.subwardenservice.assignwarden(this.subwarden_session,{headers: this.authservice.getHeaders()}).subscribe(
  res=>{
    this.resp=res;
    this.asignments = this.resp?.assignments;
this.toast.firesuccess(this.resp.message);
  },error=>{
this.toast.fireError(error.error.message);
  }
)
    }

    getactivePeriods() {
      this.activePeriodservice.getCurrentActivePeriod({headers: this.authservice.getHeaders()}).subscribe(res=>{

        this.activeperiods=res;;

      })
    }
    getBatches(data:any) {

     this.batchservice.getBatches(data,{headers: this.authservice.getHeaders()}).subscribe(res=>{
this.batches=res;
})
    }

    getlocation() {
      this.locationservice.getlocations({headers: this.authservice.getHeaders()}).subscribe(res=>{
              this.locations=res;

      })
    }
    getHostels(data:any) {

      this.hostelservice.findHostels(data,{headers: this.authservice.getHeaders()}).subscribe(res=>{
     this.hostels=res;
      })
    }

    getWardendetails() {

        this.subwardenservice
            .getwadendetails(this.subwarden, {headers: this.authservice.getHeaders()})
            .subscribe((res) => {
                this.resp = res;
                // console.log(res);
                this.subwarden = this.resp?.student;
                this.asignments = this.resp?.assignments;
            });
    }
    ngOnDestroy(): void {
        this.paramservice.removeparam('subwarden_reg_number');
    }
}
