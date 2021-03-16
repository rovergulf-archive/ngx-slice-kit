import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';



@NgModule({
    declarations: [
        AccordionComponent,
    ],
    exports: [
        AccordionComponent,
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
export class AccordionModule { }
