import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

    routes: any[] = [];

    constructor() {
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

    ngOnDestroy(): void {
    }

}
