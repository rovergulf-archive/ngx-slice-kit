import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {BadgesComponent} from './badges/badges.component';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
// import {ChipsComponent} from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
// import {RippleComponent} from './ripple/ripple.component';
// import {StepperComponent} from './stepper/stepper.component';


const moduleDeclarations = [
    // BadgesComponent,
    ButtonComponent,
    ButtonGroupComponent,
    // ChipsComponent,
    IconComponent,
    // RippleComponent,
    // StepperComponent,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class ButtonsModule {
}
