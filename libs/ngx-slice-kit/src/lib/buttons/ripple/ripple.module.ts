import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleComponent } from './ripple.component';


@NgModule({
    declarations: [
        RippleComponent
    ],
    exports: [
        RippleComponent
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
export class RippleModule {
}
