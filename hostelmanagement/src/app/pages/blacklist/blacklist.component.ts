import { Blacklist } from "@/models/blacklist";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { BlacklistService } from "@services/blacklist.service";
import { ToastService } from "@services/toast.service";
import { Subject } from "rxjs";


@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
})
export class BlacklistComponent implements OnInit {
  feddback_message_status: any;

  feedback_message: any;

  blacklist = new Blacklist();
  myresponse: any;
  studentblacklist: any;
  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private blacklistservice: BlacklistService,
    private authservice: AuthService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,

      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer',
      },
      destroy: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf'],
    };
    this.getBlacklist();
  }

  getBlacklist() {
    this.blacklistservice
      .getBlacklist({ headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          console.log(res);
          this.studentblacklist = res;
          this.dtTrigger.next(null);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  deleteStudent(blacklist: any) {
    this.blacklist = blacklist;
    this.feddback_message_status = 0;
    this.feedback_message = '';

    this.blacklistservice
      .deleteBlacklist(this.blacklist, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {
          // this.feddback_message_status = 1;
          this.myresponse = res;
          this.studentblacklist = this.myresponse.blacklist;
          // this.feedback_message = this.myresponse.message;
this.toast.firesuccess(this.myresponse.message);
          var table = $('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError( error.error.message);
          // this.feddback_message_status = 2;
          // this.feedback_message =;
        }
      );
  }
  createBlacklist() {
    this.blacklist.blacklisted_by = this.authservice.getUserId();
    this.blacklistservice
      .createBlacklist(this.blacklist, {
        headers: this.authservice.getHeaders(),
      })
      .subscribe(
        (res) => {
          // this.feddback_message_status = 1;
          this.myresponse = res;
          this.studentblacklist = this.myresponse.blacklist;
          // this.feedback_message = this.myresponse.message;
          this.toast.firesuccess(this.myresponse.message);

          var table = $('#mytable').DataTable();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          this.toast.fireError( error.error.message);
        }
      );
  }
}
