import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from '../buttons/buttons.module';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './nav-tabs/tab-link.directive';
import { SidenavContainerComponent } from './sidenav/sidenav-container.component';
import { SidenavContentComponent } from './sidenav/sidenav-content.component';
import { NavMenuItemComponent } from './nav-menu/nav-menu-item/nav-menu-item.component';
import { NavMenuGroupComponent } from './nav-menu/nav-menu-group/nav-menu-group.component';

const moduleDirectives = [
    TabLinkDirective,
];

const moduleDeclarations = [
    ...moduleDirectives,
    NavMenuComponent,
    NavMenuItemComponent,
    NavMenuGroupComponent,
    SidenavContainerComponent,
    SidenavContentComponent,
    SidenavComponent,
    TabsComponent,
    TabComponent,
    NavTabsComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ButtonsModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class NavigationModule {
}
