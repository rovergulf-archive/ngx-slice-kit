import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { fromEvent, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";

import { ThemeService } from 'ngx-slice-kit';
import { LayoutService } from "ngx-core-kit";
import { CookieService } from "ngx-cookie-universal";

const THEME_NAME = 'slice-theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    sub: Subscription;
    @ViewChild('wrap', {static: true}) container;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        public themeService: ThemeService,
        public layoutService: LayoutService,
        private router: Router,
        private cookieService: CookieService
    ) {
    }

    sideNavStyle = {
        'border-right': '1px solid var(--regular-disabled)',
        'background-color': 'var(--background)',
        'width': '320px',
        'padding': '72px 0 16px 0'
    };

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.layoutService.cookieName = THEME_NAME;
            this.layoutService.themeName = this.cookieService.get(THEME_NAME) || 'light';

            this.layoutService.mobileLayout = this.document.documentElement.clientWidth < 960;
            this.layoutService.sidenavOpened = !this.layoutService.mobileLayout;
            this.sub = fromEvent(window, 'resize').subscribe(() => {
                this.layoutService.mobileLayout = this.document.documentElement.clientWidth < 960;
            });

            const routerSub = this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
                if (this.layoutService.mobileLayout && this.layoutService.sidenavOpened) {
                    this.layoutService.sidenavOpened = false;
                }
                this.container.nativeElement.scrollTop = 0;
            });

            this.sub.add(routerSub);
        }
    }

    ngOnDestroy(): void {
    }

}
