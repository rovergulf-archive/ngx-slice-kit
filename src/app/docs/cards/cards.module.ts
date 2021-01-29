import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoCardsRoutingModule } from './cards-routing.module';

import { DemoDashboardCardComponent } from './demo-dashboard-card/demo-dashboard-card.component';
import { DemoShoppingCardComponent } from './demo-shopping-card/demo-shopping-card.component';
import { DemoSocialCardComponent } from './demo-social-card/demo-social-card.component';
import { DemoTextCardComponent } from './demo-text-card/demo-text-card.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoDashboardCardComponent,
    DemoShoppingCardComponent,
    DemoSocialCardComponent,
    DemoTextCardComponent
];

@NgModule({
    imports: [
        CommonModule,
        DemoCardsRoutingModule,
        SliceKitModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DemoCardsModule {
}
