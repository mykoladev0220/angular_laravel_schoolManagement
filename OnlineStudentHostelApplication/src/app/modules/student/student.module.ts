import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';

import { HomeComponent } from './components/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DataTablesModule } from 'angular-datatables';
import { HistoryComponent } from './components/history/history.component';






@NgModule({
  declarations: [


    HomeComponent,
    ApplicationComponent,
    NavbarComponent,
    DashboardComponent,
    TopNavComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    DataTablesModule
  ]
})
export class StudentModule { }
