import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DemoDropdownRoutingModule } from './dropdown-routing.module';

import { DemoAutocompleteComponent } from './demo-autocomplete/demo-autocomplete.component';
import { DemoDropdownComponent } from './demo-dropdown/demo-dropdown.component';
import { DemoSelectComponent } from './demo-select/demo-select.component';
import { FormsModule } from '@angular/forms';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoAutocompleteComponent,
    DemoDropdownComponent,
    DemoSelectComponent,
];

@NgModule({
    imports: [
        CommonModule,
        DemoDropdownRoutingModule,
        FormsModule,
        SharedModule,
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
export class DemoDropdownModule {
}
