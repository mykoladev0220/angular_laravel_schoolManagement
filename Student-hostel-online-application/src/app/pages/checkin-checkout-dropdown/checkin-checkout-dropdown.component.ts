import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncriprionserviceService } from '@services/encriprionservice.service';
import { ParamsService } from '@services/params.service';

@Component({
  selector: 'app-checkin-checkout-dropdown',
  templateUrl: './checkin-checkout-dropdown.component.html',
  styleUrls: ['./checkin-checkout-dropdown.component.scss']
})
export class CheckinCheckoutDropdownComponent implements OnInit {
  subwarden:any;
  subwarden_batch:any;
  sessionbatch:any;

  constructor(
    private router: Router,
    private encservice: EncriprionserviceService,
    private params:ParamsService
  ) {}
  ngOnInit(): void {
    this.subwarden= this.params.getparam('subwarden');
this.subwarden_batch=JSON.parse(this.encservice.decrypt(this.subwarden));
this.sessionbatch=JSON.parse(this.encservice.decrypt(this.params.getparam('mybatch')));
  }

}
