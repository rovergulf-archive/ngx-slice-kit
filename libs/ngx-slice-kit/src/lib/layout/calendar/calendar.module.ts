import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';



@NgModule({
    declarations: [
        CalendarComponent,
    ],
    exports: [
        CalendarComponent,
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
export class CalendarModule { }
