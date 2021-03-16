import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from './text-card.component';


@NgModule({
    declarations: [
        TextCardComponent
    ],
    exports: [
        TextCardComponent
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
export class TextCardModule {
}
