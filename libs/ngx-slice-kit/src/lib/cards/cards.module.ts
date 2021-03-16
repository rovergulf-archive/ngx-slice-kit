import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextCardModule } from './text-card/text-card.module';

import { CardComponent } from './card/card.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { SocialCardComponent } from './social-card/social-card.component';
import { TextCardComponent } from './text-card/text-card.component';


const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    // CardComponent,
    // DashboardCardComponent,
    // ShoppingCardComponent,
    // SocialCardComponent,
    // TextCardComponent
];

@NgModule({
    imports: [
        CommonModule,
        TextCardModule
    ],
    declarations: [],
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class CardsModule {
}
