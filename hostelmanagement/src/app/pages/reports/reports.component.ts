import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {ParamsService} from '@services/params.service';
import {ReportsService} from '@services/reports.service';
import {RoomallocationService} from '@services/roomallocation.service';
import {RoomapplicationService} from '@services/roomapplication.service';
import {Chart} from 'chart.js/auto';
import {Subject, Observable} from 'rxjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements AfterViewInit, OnInit, OnDestroy {
    dtoptions: DataTables.Settings = {};
    dtTrigger1: Subject<any> = new Subject<any>();
    dtTrigger2: Subject<any> = new Subject<any>();
    linechartdates = new Array();
    linechartvalues = new Array();
    allocation_status: any;
    application_status: any;
    batch: any;
    form = {
        active_period_id: null,
        residence_session_id: null,
        room_gender: '',
        reserved: false
    };
    allocants: any;
    myres: any;
    linechart: any;
    applications: any;
    allocations: any;
    applicants: any;
    totalcapacity: any;
    sub: any;
    Doughnutchart: any;
    piechart: any;
    subscription: any;

    time = new Observable<string>((observer) => {
        setInterval(() => observer.next(new Date().toString()), 10000);
    });

    constructor(
        private param: ParamsService,
        private reportservice: ReportsService,
        private authservice: AuthService,
        private allocationservice: RoomallocationService,
        private applicationservice: RoomapplicationService
    ) {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngAfterViewInit(): void {
        this.subscription = this.time.subscribe((t) => {
            this.getchartData();
        });
    }
    ngOnInit(): void {
        this.dtoptions = {
            pagingType: 'full_numbers',
            searching: true,
            pageLength: 5,
            lengthChange: true,
            language: {
                searchPlaceholder: 'search'
            },
            destroy: true,
            dom: 'Bfrtip'
        };
        this.batch = this.param.getparam('batch');
        this.form.active_period_id = this.batch.active_period_id;
        this.form.residence_session_id = this.batch.residence_session_id;
        this.form.room_gender = 'f';
        this.form.reserved = false;

        this.getchartData();
        this.getApplications();
        this.getAllocations();
    }

    getApplications() {
        this.applicationservice
            .getapplicationreport(this.batch, {
                headers: this.authservice.getHeaders()
            })
            .subscribe((res) => {
                console.log(res);

                this.applications = res;
                this.dtTrigger1.next(null);
            });
    }
    getAllocations() {
        this.allocationservice
            .getallocationreport(this.batch, {
                headers: this.authservice.getHeaders()
            })
            .subscribe((res) => {
                this.allocations = res;
                this.dtTrigger2.next(null);
            });
    }

    createChart(total: any, allocants: any, applicants: any) {
        var remainingcapacity = total - (allocants + applicants);
        var totaloccupants = allocants + applicants;
        var backgroundColor = ['#c2a458', '#24b0ed'];
        if (remainingcapacity > totaloccupants) {
            var backgroundColor = ['#24b0ed', '#c2a458'];
        }
        if (this.linechart != undefined) {
            this.linechart.destroy();
        }

        this.linechart = new Chart('mylinechart', {
            type: 'line', //this denotes tha type of chart

            data: {
                // values on X-Axis
                labels: this.linechartdates,
                datasets: [
                    {
                        label: 'daily allocation data',

                        data: this.linechartvalues
                    }
                ]
            },
            options: {
                plugins: {
                    // Change options for ALL labels of THIS CHART
                    title: {
                        display: true,
                        text: 'Daily Allocation Report '
                    },
                    datalabels: {
                        color: '#fff'
                    }
                },
                aspectRatio: 2.5
            }
        });
        if (this.Doughnutchart != undefined) {
            this.Doughnutchart.destroy();
        }

        this.Doughnutchart = new Chart('MyDonutChart', {
            type: 'doughnut', //this denotes tha type of chart

            data: {
                // values on X-Axis
                labels: ['Remaining Capacity', 'Capcity Used'],
                datasets: [
                    {
                        data: [remainingcapacity, totaloccupants],

                        backgroundColor,
                        hoverOffset: 4
                    }
                ]
            },
            options: {
                plugins: {
                    // Change options for ALL labels of THIS CHART
                    title: {
                        display: true,
                        text: 'Capacity Status'
                    },
                    datalabels: {
                        color: '#fff'
                    }
                },
                aspectRatio: 2.5
            }
        });
    }
    getchartData() {
        this.reportservice
            .getallocationsReports(this.form, {
                headers: this.authservice.getHeaders()
            })
            .subscribe((res) => {
                this.myres = res;
                // console.log(res);

                this.allocants = this.myres.allocants_total[0].total_allocants;
                this.applicants =
                    this.myres.applicants_total[0].total_applicants;
                this.totalcapacity =
                    this.myres.total_session_room_capacity[0].total_capacity;
                this.allocation_status = this.myres.allocation_status;
                this.application_status = this.myres.application_status;

                // console.log(this.allocation_status);

                for (let i = 0; i < this.myres.daily_allocations.length; i++) {
                    if (
                        this.linechartdates[i] !=
                            this.myres.daily_allocations[i].snapshotdate &&
                        this.linechartvalues[i] !=
                            this.myres.daily_allocations[i].dailytotal
                    ) {
                        this.linechartdates.push(
                            this.myres.daily_allocations[i].snapshotdate
                        );
                        this.linechartvalues.push(
                            this.myres.daily_allocations[i].dailytotal
                        );
                    }
                }

                this.createChart(
                    this.totalcapacity,
                    this.allocants,
                    this.applicants
                );
            });
    }
}
