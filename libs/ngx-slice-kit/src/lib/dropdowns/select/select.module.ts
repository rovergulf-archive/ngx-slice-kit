import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../buttons/icon/icon.module';
import { SelectComponent } from './select.component';


@NgModule({
    declarations: [
        SelectComponent,
    ],
    exports: [
        SelectComponent
    ],
    imports: [
        CommonModule,
        IconModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class SelectModule {
}
