import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// internals
import { IconModule } from '../../buttons/icon/icon.module';
// pagination
import { PaginationComponent } from './pagination.component';

@NgModule({
    declarations: [
        PaginationComponent,
    ],
    exports: [
        PaginationComponent,
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
export class PaginationModule {
}
