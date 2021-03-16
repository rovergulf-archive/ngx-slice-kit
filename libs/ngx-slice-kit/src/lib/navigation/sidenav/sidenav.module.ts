import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavContainerComponent } from './sidenav-container.component';
import { SidenavContentComponent } from './sidenav-content.component';


@NgModule({
    declarations: [
        SidenavComponent,
        SidenavContainerComponent,
        SidenavContentComponent,
    ],
    exports: [
        SidenavComponent,
        SidenavContainerComponent,
        SidenavContentComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class SidenavModule {
}
