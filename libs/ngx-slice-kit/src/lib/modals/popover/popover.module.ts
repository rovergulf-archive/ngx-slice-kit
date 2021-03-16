import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';



@NgModule({
    declarations: [
        PopoverComponent
    ],
    exports: [
        PopoverComponent
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
export class PopoverModule { }
