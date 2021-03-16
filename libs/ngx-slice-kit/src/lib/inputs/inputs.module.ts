import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from '../buttons/buttons.module';
import { CheckboxModule } from './checkbox/checkbox.module';
// import { DatepickerModule } from './datepicker/datepicker.module';
import { InputModule } from './input/input.module';
import { RadioModule } from './radio/radio.module';
import { TextareaModule } from './textarea/textarea.module';
import { ToggleModule } from './toggle/toggle.module';
// import { WysiwygModule } from './wysiwyg/wysiwyg.module';

const modules = [
    CheckboxModule,
    // DatepickerModule,
    InputModule,
    RadioModule,
    TextareaModule,
    ToggleModule,
    // WysiwygModule,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
        ...modules,
    ],
    declarations: [],
    exports: [
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class InputsModule {
}
