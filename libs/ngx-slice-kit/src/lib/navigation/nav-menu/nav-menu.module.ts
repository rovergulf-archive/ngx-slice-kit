import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './nav-menu.component';
import { NavMenuGroupComponent } from './nav-menu-group/nav-menu-group.component';
import { NavMenuItemComponent } from './nav-menu-item/nav-menu-item.component';

@NgModule({
    declarations: [
        NavMenuComponent,
        NavMenuGroupComponent,
        NavMenuItemComponent,
    ],
    exports: [
        NavMenuComponent,
        NavMenuGroupComponent,
        NavMenuItemComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class NavMenuModule { }
