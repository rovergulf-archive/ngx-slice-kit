import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';


@NgModule({
    declarations: [
        CheckboxComponent
    ],
    exports: [
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class CheckboxModule {
}
