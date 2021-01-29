import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoInputsRoutingModule } from './inputs-routing.module';

import { DemoCheckboxComponent } from './demo-checkbox/demo-checkbox.component';
import { DemoDatepickerComponent } from './demo-datepicker/demo-datepicker.component';
import { DemoInputsComponent } from './demo-inputs/demo-inputs.component';
import { DemoRadioComponent } from './demo-radio/demo-radio.component';
import { DemoSwitchesComponent } from './demo-switches/demo-switches.component';
import { DemoTextareaComponent } from './demo-textarea/demo-textarea.component';
import { DemoWysiwygComponent } from './demo-wysiwyg/demo-wysiwyg.component';
import { FormsModule } from '@angular/forms';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoCheckboxComponent,
    DemoDatepickerComponent,
    DemoInputsComponent,
    DemoRadioComponent,
    DemoSwitchesComponent,
    DemoTextareaComponent,
    DemoWysiwygComponent,
];

@NgModule({
    imports: [
        CommonModule,
        DemoInputsRoutingModule,
        FormsModule,
        SliceKitModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DemoInputsModule {
}
