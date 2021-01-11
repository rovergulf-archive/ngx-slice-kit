import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { EventComponent } from "./components/event/event.component";
import { InviteComponent } from "./components/invite/invite.component";
import { SliceKitModule } from "ngx-slice-kit";

const moduleDeclarations = [
    // components
    EventComponent,
    InviteComponent,
    // directives
    // layout
    HeaderComponent,
    FooterComponent
];

@NgModule({
    declarations: [
        ...moduleDeclarations
    ],
    exports: [
        ...moduleDeclarations
    ],
    providers: [],
    imports: [
        CommonModule,
        SliceKitModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ToolsModule {
}
