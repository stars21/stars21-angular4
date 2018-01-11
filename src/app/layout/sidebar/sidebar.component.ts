import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { SettingsService } from '../../core/settings/settings.service';
import { LayoutService } from '@myproject/layout/layout.service';
import { Result } from '@myproject/core/http/result.model';
import { error } from 'selenium-webdriver';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [ LayoutService ]
})
export class SideBarComponent implements OnInit {

    isOpenOne = true;
    sidebarClass= 'sidebar';
    menus: any = [];

    constructor(public settings: SettingsService, private router: Router, private layoutService: LayoutService) {
    }

    ngOnInit() {
        this.layoutService.getAllMenus().then((res: Result) => {
            this.menus = res.data;
        }).catch(error => {

        });
    }

    push() {
        this.router.navigateByUrl('dashboard');
    }

    push1() {
        this.router.navigateByUrl('form');
    }


}

