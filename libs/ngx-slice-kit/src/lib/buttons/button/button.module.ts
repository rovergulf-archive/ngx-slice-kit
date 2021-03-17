import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';


@NgModule({
    declarations: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ButtonModule {
}
