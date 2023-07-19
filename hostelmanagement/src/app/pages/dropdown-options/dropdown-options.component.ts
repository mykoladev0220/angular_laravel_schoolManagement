import { UserRights } from '@/models/user-rights';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { ParamsService } from '@services/params.service';


@Component({
  selector: 'app-dropdown-options',
  templateUrl: './dropdown-options.component.html',
  styleUrls: ['./dropdown-options.component.scss']
})
export class DropdownOptionsComponent implements OnInit {
  myrights= new UserRights();
  currenturl=null;
  constructor(
    private params: ParamsService,
    private router:Router
  ) {
    this.router.events.subscribe((event) => {


      if (event instanceof NavigationEnd) {

        this.currenturl = event.url;



    }


    })

  }
  ngOnInit(): void {


    this.router.events.subscribe((event) => {


 this.currenturl=this.router.url;




    })

this.myrights= this.params.getparam('myrights');


  }
}
