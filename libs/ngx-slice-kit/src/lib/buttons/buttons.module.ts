import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BadgesModule } from './badges/badges.module';
import { ButtonModule } from './button/button.module';
import { ButtonGroupModule } from './button-group/button-group.module';
// import { ChipsModule } from './chips/chips.module';
import { IconModule } from './icon/icon.module';
// import { RippleModule } from './ripple/ripple.module';
// import { StepperModule } from './stepper/stepper.module';

const modules = [
    // BadgesModule,
    ButtonModule,
    ButtonGroupModule,
    // ChipsModule,
    IconModule,
    // RippleModule,
    // StepperModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
        ...modules
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class ButtonsModule {
}
