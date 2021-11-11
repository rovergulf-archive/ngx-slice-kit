import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[sdk-nav-menu-item]',
    // templateUrl: './nav-menu-item.component.html',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./nav-menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavMenuItemComponent{
    constructor() {
    }
}
