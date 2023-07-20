import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';

import { BatchesComponent } from './pages/batches/batches.component';
import { BlacklistComponent } from './pages/blacklist/blacklist.component';
import { PeriodsComponent } from './pages/periods/periods.component';

import { FloorsComponent } from './pages/floors/floors.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomstypesComponent } from './pages/roomstypes/roomstypes.component';
import { ResavationsComponent } from './pages/resavations/resavations.component';
import { RoomcostsComponent } from './pages/roomcosts/roomcosts.component';
import { RoomallocationComponent } from './pages/roomallocation/roomallocation.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRightsComponent } from './pages/user-rights/user-rights.component';
import { ViewBatchComponent } from './pages/view-batch/view-batch.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ProgrampreferenceComponent } from './pages/programpreference/programpreference.component';

import { HostelsComponent } from './pages/hostels/hostels.component';
import { LevelPreferenceComponent } from './pages/level-preference/level-preference.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { CreateSubwardenComponent } from './pages/create-subwarden/create-subwarden.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { CheckinReportComponent } from './pages/checkin-report/checkin-report.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WardenhostelsComponent } from './pages/wardenhostels/wardenhostels.component';
import { CheckoutReportComponent } from './pages/checkout-report/checkout-report.component';
import { DropdownOptionsComponent } from './pages/dropdown-options/dropdown-options.component';
import { PeriodDropdownOptionsComponent } from './pages/period-dropdown-options/period-dropdown-options.component';
import { HostelsDropdownOptionsComponent } from './pages/hostels-dropdown-options/hostels-dropdown-options.component';

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,

        BatchesComponent,
        BlacklistComponent,
        PeriodsComponent,

        FloorsComponent,
        RoomsComponent,
        RoomstypesComponent,
        ResavationsComponent,
        RoomcostsComponent,
        RoomallocationComponent,
        UsersComponent,
        UserRightsComponent,
        ViewBatchComponent,
        ReportsComponent,

        ProgrampreferenceComponent,
        HostelsComponent,
        LevelPreferenceComponent,
        NotfoundComponent,
        ChangePasswordComponent,
        CreateSubwardenComponent,
        CheckinComponent,
        CheckinReportComponent,
        CheckoutComponent,
        WardenhostelsComponent,
        CheckoutReportComponent,
        DropdownOptionsComponent,
        PeriodDropdownOptionsComponent,
        HostelsDropdownOptionsComponent
    ],
    imports: [
      FormsModule,
        BrowserModule,
        DataTablesModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxUiLoaderModule,

        NgxUiLoaderHttpModule.forRoot({
          showForeground:true
        })


    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
