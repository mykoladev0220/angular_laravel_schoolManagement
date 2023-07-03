import {HistoryComponent} from './pages/history/history.component';
import {HomeComponent} from './pages/home/home.component';
import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ApplicationComponent} from '@pages/application/application.component';
import { HasappliedGuard } from '@guards/hasapplied.guard';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
canActivate:[AuthGuard],
        children: [


            {
                path: 'application',
                component: ApplicationComponent,
                canActivate:[HasappliedGuard]
            },
            {
                path: 'home',
                component: HomeComponent,

            },
            {
                path: 'history',
                component: HistoryComponent,

            },

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },

    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
