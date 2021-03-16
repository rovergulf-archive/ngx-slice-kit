import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
    declarations: [
        ButtonGroupComponent
    ],
    exports: [
        ButtonGroupComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ButtonGroupModule {
}
