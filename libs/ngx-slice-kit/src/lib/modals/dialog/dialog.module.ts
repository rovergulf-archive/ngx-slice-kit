import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDirective } from './dialog.directive';
import { DialogComponent } from './dialog.component';


@NgModule({
    declarations: [
        DialogDirective,
        DialogComponent,
    ],
    exports: [
        DialogDirective,
        DialogComponent,
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DialogModule {
}
