import { AfterContentInit, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
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
export class NavMenuComponent implements AfterContentInit {

    @ContentChildren(NavMenuItemComponent) public menuItems!: QueryList<NavMenuItemComponent>;

    public menuGroup = [];

    constructor() {
    }

    public ngAfterContentInit(): void {
        this.menuItems.forEach(tabInstance => this.menuGroup.push(tabInstance));
    }

}
