import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'a[sdk-nav-menu-item]',
    // templateUrl: './nav-menu-item.component.html',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./nav-menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavMenuItemComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
