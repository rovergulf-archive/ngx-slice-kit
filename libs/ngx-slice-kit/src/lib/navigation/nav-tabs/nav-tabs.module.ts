import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// internals
import { IconModule } from '../../buttons/icon/icon.module';
// nav tabs
import { NavTabsComponent } from './nav-tabs.component';
import { TabLinkDirective } from './tab-link.directive';

@NgModule({
    declarations: [
        TabLinkDirective,
        NavTabsComponent,
    ],
    exports: [
        TabLinkDirective,
        NavTabsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        IconModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class NavTabsModule {
}
