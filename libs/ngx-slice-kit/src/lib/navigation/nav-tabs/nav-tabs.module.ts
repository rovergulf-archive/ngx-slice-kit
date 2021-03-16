import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavTabsComponent } from './nav-tabs.component';

@NgModule({
    declarations: [
        NavTabsComponent,
    ],
    exports: [
        NavTabsComponent,
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
export class NavTabsModule {
}
