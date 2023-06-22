import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { IsPasswordvalidGuard } from './guards/is-passwordvalid.guard';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PasswordResertComponent } from './components/password-resert/password-resert.component';

const routes: Routes = [
  // {
  //   path: 'user',
  //   loadChildren: () =>
  //     import('./modules/usermodule/usermodule.module').then(
  //       (m) => m.UsermoduleModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/adimin/adimin.module').then((m) => m.AdiminModule),
    canActivate: [AuthGuard,IsPasswordvalidGuard],
  },
  { path: 'changepassword', component: ChangepasswordComponent },
  {path: 'resertpassword',component: PasswordResertComponent},
  {path: 'changeforgotpassword',component: PasswordChangeComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
