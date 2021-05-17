import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTabComponent } from './basic-tab.component';
import { IconModule } from '../../buttons/icon/icon.module';


@NgModule({
    declarations: [
        BasicTabComponent
    ],
    exports: [
        BasicTabComponent
    ],
    imports: [
        CommonModule,
        IconModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class BasicTabModule {
}
