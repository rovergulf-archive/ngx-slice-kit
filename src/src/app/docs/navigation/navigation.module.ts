import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoNavigationRoutingModule } from './navigation-routing.module';

import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { DemoSidenavComponent } from './demo-sidenav/demo-sidenav.component';
import { DemoTabsComponent } from './demo-tabs/demo-tabs.component';
import { DemoNavtabsComponent } from './demo-navtabs/demo-navtabs.component';

import { DemoPageOneComponent } from './demos/page-one/page-one.component';
import { DemoPageTwoComponent } from './demos/page-two/page-two.component';
import { DemoPageThreeComponent } from './demos/page-three/page-three.component';
import { DemoPageFourComponent } from './demos/page-four/page-four.component';
import { DemoPageFiveComponent } from './demos/page-five/page-five.component';


const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoMenuComponent,
    DemoSidenavComponent,
    DemoTabsComponent,
    DemoNavtabsComponent,
    DemoPageOneComponent,
    DemoPageTwoComponent,
    DemoPageThreeComponent,
    DemoPageFourComponent,
    DemoPageFiveComponent
];

@NgModule({
    imports: [
        CommonModule,
        DemoNavigationRoutingModule,
        SliceKitModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DemoNavigationModule {
}
