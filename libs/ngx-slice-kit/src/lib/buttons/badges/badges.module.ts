import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesComponent } from './badges.component';


@NgModule({
    declarations: [
        BadgesComponent
    ],
    exports: [
        BadgesComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BadgesModule {
}
