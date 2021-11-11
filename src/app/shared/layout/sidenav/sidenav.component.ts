import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

const rovergulfUrl = 'https://rovergulf.net';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    routes: any[] = [];

    constructor(
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.routes = [
            {
                name: 'Guides',
                path: '/guides',
                children: [],
            },
            {
                name: 'Documents',
                path: '/docs',
                children: [],
            },
            {
                name: 'Resources',
                path: '/resources',
                children: [
                    {
                        name: 'About',
                        path: '/resources/about',
                    },
                ],
            },
        ];
    }

    get rovergulfUrl(): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(rovergulfUrl);
    }
}
