import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';

import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { HostelsComponent } from '@pages/hostels/hostels.component';
import { CanallocateroomsGuard } from '@guards/canallocaterooms.guard';
import { CanblackliststudentsGuard } from '@guards/canblackliststudents.guard';
import { CancreateuserGuard } from '@guards/cancreateuser.guard';
import { CanreserveroomsGuard } from '@guards/canreserverooms.guard';
import { CansetroomcostGuard } from '@guards/cansetroomcost.guard';
import { IsSuperadminGuard } from '@guards/is-superadmin.guard';
import { BatchesComponent } from '@pages/batches/batches.component';
import { BlacklistComponent } from '@pages/blacklist/blacklist.component';
import { FloorsComponent } from '@pages/floors/floors.component';
import { LevelPreferenceComponent } from '@pages/level-preference/level-preference.component';
import { PeriodsComponent } from '@pages/periods/periods.component';
import { ProgrampreferenceComponent } from '@pages/programpreference/programpreference.component';
import { ReportsComponent } from '@pages/reports/reports.component';
import { ResavationsComponent } from '@pages/resavations/resavations.component';
import { RoomallocationComponent } from '@pages/roomallocation/roomallocation.component';
import { RoomcostsComponent } from '@pages/roomcosts/roomcosts.component';
import { RoomsComponent } from '@pages/rooms/rooms.component';
import { RoomstypesComponent } from '@pages/roomstypes/roomstypes.component';
import { UserRightsComponent } from '@pages/user-rights/user-rights.component';
import { UsersComponent } from '@pages/users/users.component';
import { ViewBatchComponent } from '@pages/view-batch/view-batch.component';
import { NotfoundComponent } from '@pages/notfound/notfound.component';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '@modules/change-password/change-password.component';
import { CreateSubwardenComponent } from '@pages/create-subwarden/create-subwarden.component';
import { WardenhostelsComponent } from '@pages/wardenhostels/wardenhostels.component';
import { CheckinComponent } from '@pages/checkin/checkin.component';
import { CheckinReportComponent } from '@pages/checkin-report/checkin-report.component';
import { CheckoutComponent } from '@pages/checkout/checkout.component';
import { CheckoutReportComponent } from '@pages/checkout-report/checkout-report.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],

        children: [

            {
                path: '',
                component: HostelsComponent
            }
            ,
            { path: 'hostels', component: HostelsComponent },
            { path: 'allrooms', component: RoomsComponent },

            { path: 'batches', component: BatchesComponent },

            { path: 'viewbatch', component: ViewBatchComponent },

             { path: 'allperiods', component: PeriodsComponent },
            { path: 'rights', component: UserRightsComponent },
            { path: 'Resevations', component: ResavationsComponent,canActivate:[CanreserveroomsGuard] },
            { path: 'floors', component: FloorsComponent },

            {
              path: 'roomtypes',
              component: RoomstypesComponent,

            },
            { path: 'roomallocation', component: RoomallocationComponent,canActivate:[CanallocateroomsGuard] },
            {
              path: 'roomcosts',
              component: RoomcostsComponent,
              canActivate: [CansetroomcostGuard],
            },
            { path: 'blacklist', component: BlacklistComponent, canActivate:[CanblackliststudentsGuard] },
            { path: 'reports', component: ReportsComponent },
            {
              path: 'levelpreference',
              component: LevelPreferenceComponent,
            },
            {
              path: 'programmepreference',
              component: ProgrampreferenceComponent,
            },
            {
              path: 'subwarden',
              component: CreateSubwardenComponent,
            },
            {
              path: 'subwardendetails',
              component: WardenhostelsComponent,
            },
            {
              path: 'checkin',
              component:CheckinComponent,
            },
            {
              path: 'checkin-report',
              component:CheckinReportComponent,
            },
            {
              path: 'checkout',
              component:CheckoutComponent,
            },
            {
              path: 'checkout-report',
              component:CheckoutReportComponent,
            },
            {
              path: 'user',
              component: UsersComponent,
              canActivate: [CancreateuserGuard],
            },
        ]
    },
    {
      path: '',
      component: LoginComponent,

  },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'register',
        component: RegisterComponent,

    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,

    },
    {
      path: 'changepassword',
      component: ChangePasswordComponent,

  },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,

    },
    {path: '**', component:NotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
