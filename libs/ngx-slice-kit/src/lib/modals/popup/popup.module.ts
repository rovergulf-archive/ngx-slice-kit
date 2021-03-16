import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { ButtonModule } from '../../buttons/button/button.module';



@NgModule({
    declarations: [
        PopupComponent
    ],
    exports: [
        PopupComponent
    ],
    imports: [
        CommonModule,
        ButtonModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class PopupModule { }
