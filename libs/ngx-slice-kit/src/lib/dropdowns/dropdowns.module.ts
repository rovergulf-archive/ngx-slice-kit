import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '../buttons/buttons.module';

import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { SelectModule } from './select/select.module';
import { DropdownMenuTriggerDirective } from './context/dropdown-menu-trigger.directive';

const moduleDirectives = [
    DropdownMenuTriggerDirective,
];

const moduleDeclarations = [
    // Directives
    ...moduleDirectives,
];

const modules = [
    AutocompleteModule,
    SelectModule,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
    ],
    declarations: [
        ...moduleDeclarations,
    ],
    exports: [
        ...moduleDeclarations,
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DropdownsModule {
}
