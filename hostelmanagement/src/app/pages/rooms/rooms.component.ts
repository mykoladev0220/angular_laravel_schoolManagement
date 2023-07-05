import { Resavation } from "@/models/resavation";
import { Room } from "@/models/room";
import { UserRights } from "@/models/user-rights";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { FloorService } from "@services/floor.service";
import { HostelService } from "@services/hostel.service";
import { ParamsService } from "@services/params.service";
import { RoomService } from "@services/room.service";
import { RoomtypeService } from "@services/roomtype.service";
import { ToastService } from "@services/toast.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatbleElement: any = DataTableDirective;

  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  roomgender = {
    male: 'm',
    female: 'f',
  };
  roomtypes: any;
  hostelid: any;
  myrights = new UserRights();
  rooms: any;
  room: any = new Room();
  feddback_message_status: any;
  msg: any;
  resavation = new Resavation();
  feedback_message: any;
  hostels: any;
  table: any;
  floors: any;
  userrole: any;
  constructor(
    private roomservice: RoomService,
    private floorservice: FloorService,
    private roomtypeservice: RoomtypeService,
    private hostelservice: HostelService,
    private paramsService: ParamsService,
    private roomtypeService: RoomtypeService,
    private authservice: AuthService,
    private toast: ToastService
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
    this.userrole = this.authservice.getRole();

    this.myrights = this.paramsService.getparam('myrights');
    this.room.room_gender = '';
    this.room.floor_id = '';
    this.room.room_type_id = '';
    this.hostelid = this.gethostel();
    this.room.hostel_id = this.hostelid;
    this.getRooms(this.hostelid);
    this.getRoomType();
    this.getHostel();
    this.getFloors(this.hostelid);
  }

  createRooms() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.roomservice
      .createRooms(this.room, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          var table = $('.table').DataTable();
          table.clear();
          // this.feddback_message_status = 1;
          this.msg = res;
          // this.feedback_message = this.msg.message;
this.toast.firesuccess(this.msg.message);
          this.rooms = this.msg.rooms;

          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {

          // this.feddback_message_status = 2;
          // this.feedback_message = error.error.message;
          this.toast.fireError(error.error.message);
        }
      );
  }
  getFloors(hostel_id: any) {
    this.floorservice
      .getFloor(
        { hostel_id: hostel_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.floors = res;
      });

    this.roomservice
      .getRooms(
        { hostel_id: hostel_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.rooms = res;
      });
  }

  getHostel() {
    this.hostelservice
      .getHostels({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.hostels = res;
      });
  }
  getRoomType() {
    this.roomtypeservice
      .getRoomType({ headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          console.log(res);
          this.roomtypes = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getroomtpes() {
    this.roomtypeService
      .getRoomType({ headers: this.authservice.getHeaders() })
      .subscribe((res) => {
        this.roomtypes = res;
      });
  }
  updateRoom() {
    this.roomservice
      .updateroom(this.room, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.feddback_message_status = 1;
          this.msg = res;
          this.feedback_message = this.msg.message;
          this.rooms = this.msg.rooms;
          this.toast.firesuccess(this.msg.message);
          var table = $('#mytable').DataTable();
          table.clear();
          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {
          // this.feddback_message_status = 2;
          // this.feedback_message = error.error.message;
          this.toast.fireError(error.error.message);

        }
      );
  }

  //
  deleteRoom() {
    this.feddback_message_status = 0;
    this.feedback_message = '';
    this.roomservice
      .deleteRoom(this.room, { headers: this.authservice.getHeaders() })
      .subscribe(
        (res) => {
          this.msg = res;

          // this.feddback_message_status = 1;
          // this.feedback_message = this.msg.message;
          this.toast.firesuccess(this.msg.message);
          this.rooms = this.msg.rooms;
          var table = $('#mytable').DataTable();

          table.destroy();
          this.dtTrigger.next(null);
        },
        (error) => {

          this.toast.fireError(error.error.message);
        }
      );
  }

  setRoomId(room: any) {
    this.room = room;
    this.getroomtpes();
  }
  gethostel() {
    const hostel = this.paramsService.getparam('hostel');
    // console.log( );
    return hostel.hostel_id;
  }
  getRooms(hostel_id: any) {
    this.roomservice
      .getRooms(
        { hostel_id: hostel_id },
        { headers: this.authservice.getHeaders() }
      )
      .subscribe((res) => {
        this.rooms = res;

        var table = $('#mytable').DataTable();
        table.destroy();
        this.dtTrigger.next(null);
      });
  }
}
