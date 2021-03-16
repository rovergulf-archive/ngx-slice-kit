import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialCardComponent } from './social-card.component';


@NgModule({
    declarations: [
        SocialCardComponent,
    ],
    exports: [
        SocialCardComponent,
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class SocialCardModule {
}
