import { User } from "@/models/user";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { ParamsService } from "@services/params.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  msg: any;
  dtoptions:any= {};
  dtTrigger: Subject<any> = new Subject<any>();
  feedback_message: any;
  feedback_message_status: any;
  users: any;
  usermodel = new User();
  ngOnInit(): void {
    this.dtoptions = {
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv' ,'excel' ,'pdf'
    ],
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: true,
      pageLength:5,
      language: {
        searchPlaceholder: 'search',
      },
    };
    this.usermodel.role = '';
    this.usermodel.is_active = '1';
    this.getUsers();
  }

  constructor(private authService: AuthService,
   private paramsservice:ParamsService,
   private toast:ToastService,
   private router:Router) {}


activateUser(user_id:any){
  this.feedback_message_status = 0;
  this.feedback_message = '';
  this.authService.activateUser({user_id:user_id},{ headers: this.authService.getHeaders() }).subscribe(
    (res) => {

      this.msg = res;
      this.toast.firesuccess(this.msg.message)
      this.feedback_message = this.msg.message;
      this.users = this.msg.users;
      var table=$('#mytable').DataTable();
      table.destroy();
      this.dtTrigger.next(null);
    },
    (error) => {
      this.toast.fireError(error.error.message)

    }
  );
}
DeactivateUser(user_id:any){
  this.feedback_message_status = 0;
  this.feedback_message = '';
  this.authService.deactivateUser({user_id:user_id},{ headers: this.authService.getHeaders() }).subscribe(
    (res) => {

      this.msg = res;
      this.toast.firesuccess(this.msg.message)
    ;
      this.users = this.msg.users;
      var table=$('#mytable').DataTable();
      table.destroy();
      this.dtTrigger.next(null);
    },
    (error) => {
      this.toast.fireError(error.error.message)
    }
  );
}

gotorights(user:any){
this.paramsservice.setparam('userright',user);
this.router.navigate(['rights']);
}


  getUsers() {
    this.feedback_message_status = 0;
    this.feedback_message = '';
    this.authService
      .getUsers({ headers: this.authService.getHeaders() })
      .subscribe(
        (res) => {
          this.users = res;
          this.dtTrigger.next(null);
        },
        (error) => {
          this.feedback_message_status = 2;
          this.feedback_message = 'server error';
        }
      );
  }

  createuser(user: any) {
    this.feedback_message_status = 0;
    this.feedback_message = '';
    user.value.password=user.value.email;
    console.log(user.value);

    this.authService
      .register(user.value, { headers: this.authService.getHeaders() })
      .subscribe(
        (res) => {

          this.msg = res;
          this.toast.firesuccess(this.msg.message)
          this.users = this.msg.users;
          var table=$('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
      this.toast.fireError(error.error.message)  }
      );
  }
}
