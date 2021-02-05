import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';


@NgModule({
    declarations: [
        ButtonComponent,
        ButtonGroupComponent
    ],
    exports: [
        ButtonComponent,
        ButtonGroupComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ButtonGroupModule {
}
