import { UserRights } from "@/models/user-rights";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { ParamsService } from "@services/params.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";


@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.scss'],
})
export class UserRightsComponent implements OnInit {
  user: any;
  myrights: any;
  rightstoadd: any;
  response: any;
  feedback_message: any;
  right=new UserRights();
  feedback_message_status: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private paramservice: ParamsService,
    private authservice: AuthService,
    private toast :ToastService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      language: {
        searchPlaceholder: 'search',
      },
      destroy: true,
    };
    this.user = this.paramservice.getparam('userright');

    this.getrights();
  }

  AssignRight() {

var rights= JSON.stringify(this.right);
    this.feedback_message_status = 0;
    this.feedback_message = '';
    var assigned_by=this.authservice.getUserId();
    this.authservice
      .assignRights(
        { user_id: this.user.user_id, rights: rights,assigned_by:assigned_by },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          console.log(res);

          this.response = res;
          this.myrights = this.response.myrights;
          this.rightstoadd = this.response.rightstoadd;

          this.toast.firesuccess(this.response.message);
          this.dtTrigger.next;
        },
        (error) => {
        this.toast.fireError(error.error.message);
        }
      );
  }


  getrights() {
    this.authservice
      .getrights(
        { user_id: this.user.user_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe(
        (res) => {
          console.log(res);

          this.response = res;

      this.right= JSON.parse(this.response.rights);

          this.dtTrigger.next(null);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
