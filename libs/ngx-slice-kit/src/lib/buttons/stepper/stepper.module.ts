import { NgModule } from '@angular/core';
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
