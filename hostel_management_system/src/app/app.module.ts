import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PasswordResertComponent } from './components/password-resert/password-resert.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,

    ChangepasswordComponent,
    PasswordChangeComponent,
    PasswordResertComponent,

  ],
  imports: [
    FormsModule      ,HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  // required animations module
    ToastrModule.forRoot(), // ToastrModule added



  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
