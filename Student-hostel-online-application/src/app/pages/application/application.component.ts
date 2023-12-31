import {Route, Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Application} from '@/models/application';
import {Student} from '@/models/student';
import {ApplicationService} from '@services/application.service';
import {AuthService} from '@services/auth.service';
import {EncriprionserviceService} from '@services/encriprionservice.service';
import {ParamsService} from '@services/params.service';
import * as bootstrap from 'bootstrap';
import {Console, log} from 'console';
import {ToastService} from '@services/toast.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
    feedback_message_status: any;
    feedback_message: any;
    student = new Student();
    rooms: any;
    msg: any;
    studentdatails: any;
    dtoptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    application = new Application();
    batchdetails: any;
    closeResult: string = '';
    roomocupants: any;
    currentOccupants: number;
    constructor(
        private router: Router,
        private authservice: AuthService,
        private applicationservice: ApplicationService,
        private encservice: EncriprionserviceService,
        private params: ParamsService,
        private toast: ToastService
    ) {}
    ngOnInit(): void {
        this.feedback_message_status = 0;
        this.dtoptions = {
            pagingType: 'full_numbers',
            searching: true,
            pageLength: 5,
            lengthMenu: [5, 10, 20],
            lengthChange: true,
            language: {
                searchPlaceholder: 'search'
            }
        };
        this.studentdatails = this.params.getparam('student');

        this.studentdatails = this.encservice.decrypt(this.studentdatails);
        this.batchdetails = this.params.getparam('mybatch');
        this.batchdetails = this.encservice.decrypt(this.batchdetails);

        this.student.student_id = JSON.parse(this.studentdatails).student_id;
        this.student.reg_number = JSON.parse(this.studentdatails).reg_number;
        var sex = JSON.parse(this.studentdatails).sex;
        console.log(this.batchdetails);

        this.application.active_period_id = JSON.parse(
            this.batchdetails
        ).active_period_id;
        this.application.residence_session_id = JSON.parse(
            this.batchdetails
        ).residence_session_id;

        if (sex == 'MALE') {
            this.student.gender = 'm';
        } else if (sex == 'FEMALE') {
            this.student.gender = 'f';
        }

        this.student.level = JSON.parse(this.studentdatails).academic_level;
        this.student.residence_session_id = JSON.parse(
            this.batchdetails
        ).residence_session_id;

        this.student.semester = JSON.parse(this.studentdatails).semester;
        this.student.period_id = JSON.parse(this.studentdatails).period_id;
        this.student.reg_number = JSON.parse(this.studentdatails).reg_number;
        this.student.active_period_id = JSON.parse(
            this.batchdetails
        ).active_period_id;

        this.getroomstoApply();
    }

    applyForARoom(room: any) {
        this.feedback_message_status = 0;

        this.application.applied_by = 'system';
        this.application.reg_number = this.student.reg_number;
        this.application.room_cost = room.room_price;
        this.application.room_id = room.room_id;
        this.application.student_id = this.student.student_id;
        this.application.reg_number = this.student.reg_number;

        this.applicationservice
            .applyForRoom(this.application, {
                headers: this.authservice.getHeaders()
            })
            .subscribe(
                (res) => {
                    this.msg = res;
                    this.toast.firesuccess(this.msg.message);

                    this.params.setparam(
                        'hasapplied',
                        this.encservice.encrypt('1')
                    );
                    setTimeout(() => {
                        this.router.navigate(['home']);
                    }, 3000);
                },
                (error) => {
                    this.toast.fireError(error.error.message);
                }
            );
    }

    getroomDetails(room_id: number, i: number) {
        var data = {
            room_id: room_id,
            residence_session_id: this.application.residence_session_id
        };

        this.applicationservice
            .getRoomInfo(data, {
                headers: this.authservice.getHeaders()
            })
            .subscribe(
                (res) => {
                    this.roomocupants = res;

                    $('#details-modal' + i).modal();
                },
                (error) => {
                    this.toast.fireError('server Error');
                }
            );
    }

    getroomstoApply() {
        console.log(this.student);

        this.applicationservice
            .getroomsToapply(this.student, {
                headers: this.authservice.getHeaders()
            })
            .subscribe(
                (res) => {
                    console.log(res);
                    this.rooms = res;
                    this.dtTrigger.next(null);
                },
                (error) => {
                    this.toast.fireError('server Error');
                }
            );
    }
}
