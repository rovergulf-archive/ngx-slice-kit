import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { NavMenuItemComponent } from './nav-menu-item/nav-menu-item.component';

@Component({
    selector: 'sdk-nav-menu',
    // templateUrl: './nav-menu.component.html',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./nav-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent implements OnInit, AfterContentInit {

    @ContentChildren(NavMenuItemComponent) menuItems!: QueryList<NavMenuItemComponent>;

    menuGroup = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.menuItems.forEach(tabInstance => this.menuGroup.push(tabInstance));
    }

}
