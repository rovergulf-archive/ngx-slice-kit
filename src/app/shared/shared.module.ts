import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SliceKitModule } from 'ngx-slice-kit';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

import { DemoComponent } from './components/demo/demo.component';

const entryComponents = [];

const sharedModuleDeclarations = [
    ...entryComponents,
    // layout
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    // components
    DemoComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SliceKitModule,
    ],
    declarations: sharedModuleDeclarations,
    exports: [
        ...sharedModuleDeclarations,
        SliceKitModule
    ],
    entryComponents,
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
