import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });

    }
}

export const MENU = [

{
  name: 'Hostels',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['hostels'],

},
{
  name: 'Users',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['user']
},
{
  name: 'Room Types',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['roomtypes']
},
{
  name: 'Periods',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['allperiods']
},
{
  name: 'Sub Wardens',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['subwarden']
},
{
  name: 'Blacklist',
  iconClasses: 'nav-icon fas fa-copy',
  path: ['blacklist']
}


];

