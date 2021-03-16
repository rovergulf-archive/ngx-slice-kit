import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../buttons/icon/icon.module';
import { AlertComponent } from './alert.component';
import { AlertsComponent } from './alerts.component';


@NgModule({
    declarations: [
        AlertComponent,
        AlertsComponent,
    ],
    exports: [
        AlertComponent,
        AlertsComponent,
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
export class AlertModule {
}
