import { Subwarden } from './../../models/subwarden.model';
import { UserRights } from '@/models/user-rights';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ParamsService } from '@services/params.service';
import { SubwardenService } from '@services/subwarden.service';
import { ToastService } from '@services/toast.service';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-create-subwarden',
  templateUrl: './create-subwarden.component.html',
  styleUrls: ['./create-subwarden.component.scss']
})
export class CreateSubwardenComponent implements OnInit {
  myrights=new UserRights();
  subwardens:any;
  subwardenmodel = new Subwarden();
  resp:any;
  dtoptions:any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private paramsService:ParamsService,private router:Router,private subwardenservice:SubwardenService,private authservice:AuthService,private toast:ToastService){}
  ngOnInit(): void {
    this.myrights=this.paramsService.getparam('myrights');
    this.getsubWarden();
  }
getsubWarden(){
this.subwardenservice.getsubwardens({ headers: this.authservice.getHeaders() }).subscribe(
  res=>{
this.resp=res;
this.subwardens=this.resp?.subwardewns;
  }
)
}
createSubWarden()
{
  this.subwardenmodel.created_by=this.authservice.getUserId();
console.log(  this.subwardenmodel.created_by)
  this.subwardenservice.createwarden(this.subwardenmodel,{ headers: this.authservice.getHeaders() }).subscribe(res=>{
this.resp=res;

this.subwardens=this.resp?.subwardens;
console.log(this.resp);

    this.toast.firesuccess(this.resp.message);
  },error=>{
this.toast.fireError(error.error.message);
  })

}
viewSubwarden(reg_number:any){
this.paramsService.setparam('subwarden',reg_number);
this.router.navigate(['subwardendetails']);
}

}
