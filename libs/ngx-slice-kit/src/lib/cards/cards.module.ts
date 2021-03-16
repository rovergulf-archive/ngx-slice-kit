import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { DashboardCardModule } from './dashboard-card/dashboard-card.module';
import { ShoppingCardModule } from './shopping-card/shopping-card.module';
import { SocialCardModule } from './social-card/social-card.module';
import { TextCardModule } from './text-card/text-card.module';


const moduleDirectives = [];

const moduleDeclarations = [
    ...moduleDirectives
];

const modules = [
    CardModule,
    DashboardCardModule,
    ShoppingCardModule,
    SocialCardModule,
    TextCardModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ...moduleDeclarations,
    ],
    exports: [
        ...moduleDeclarations,
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class CardsModule {
}
