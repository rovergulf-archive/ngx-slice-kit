import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from '../buttons/buttons.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ToggleComponent } from './toggle/toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {WysiwygComponent} from './wysiwyg/wysiwyg.component';

const moduleDeclarations = [
  CheckboxComponent,
  DatepickerComponent,
  InputComponent,
  RadioComponent,
  TextareaComponent,
  ToggleComponent,
  // WysiwygComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: moduleDeclarations,
  exports: moduleDeclarations,
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class InputsModule {
}
