import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../buttons/icon/icon.module';
import { TabsGroupComponent } from './tabs-group.component';


@NgModule({
    declarations: [
        TabsGroupComponent,
    ],
    exports: [
        TabsGroupComponent
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
export class TabsGroupModule {
}
