import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';


@NgModule({
    declarations: [
        StepperComponent
    ],
    exports: [
        StepperComponent
    ],
    imports: [
        CommonModule
    ]
})
export class StepperModule {
}
