import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutControlService, ThemeService } from 'ngx-slice-kit';
import { LayoutService } from 'ngx-core-kit';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        public themeService: ThemeService,
        public layoutService: LayoutService,
        public layoutControl: LayoutControlService,
        private router: Router
    ) {
    }

    toggleTheme() {
        this.layoutService.themeName = this.layoutService.themeName === 'light' ? 'dark' : 'light';
    }

    ngOnInit(): void {
    }

}
