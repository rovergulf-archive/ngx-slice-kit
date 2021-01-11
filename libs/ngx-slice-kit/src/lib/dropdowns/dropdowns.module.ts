import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsModule } from "../inputs/inputs.module";
import { ButtonsModule } from '../buttons/buttons.module';

import { DropdownComponent } from './dropdown.component';
import { DropdownMenuTriggerDirective } from './context/dropdown-menu-trigger.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SelectComponent } from './select/select.component';

const moduleDirectives = [
    DropdownMenuTriggerDirective,
];

const moduleDeclarations = [
    AutocompleteComponent,
    DropdownComponent,
    SelectComponent,
    // Directives
    ...moduleDirectives,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
        InputsModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DropdownsModule {
}
