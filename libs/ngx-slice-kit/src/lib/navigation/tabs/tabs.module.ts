import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { IconModule } from '../../buttons/icon/icon.module';



@NgModule({
    declarations: [
        TabsComponent,
        TabComponent,
    ],
    exports: [
        TabsComponent,
        TabComponent,
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
export class TabsModule { }
