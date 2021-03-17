import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../buttons/icon/icon.module';
import { AutocompleteComponent } from './autocomplete.component';


@NgModule({
    declarations: [
        AutocompleteComponent,
    ],
    exports: [
        AutocompleteComponent,
    ],
    imports: [
        CommonModule,
        IconModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class AutocompleteModule {
}
