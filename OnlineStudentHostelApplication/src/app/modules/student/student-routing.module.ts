import { HistoryComponent } from './components/history/history.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HasappliedGuard } from 'src/app/guards/hasapplied.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'application',
        component: ApplicationComponent,
        canActivate: [HasappliedGuard],
      },
      {
        path: 'history',
        component: HistoryComponent,

      },
      { path: '', redirectTo: 'student/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
