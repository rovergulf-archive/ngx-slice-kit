import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightModule } from 'ngx-highlightjs';
import { SliceKitModule } from 'ngx-slice-kit';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

import { ApiDefTableComponent } from './components/api-def-table/api-def-table.component';
import { DemoComponent } from './components/demo/demo.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { ThemeColorComponent } from './components/theme-color/theme-color.component';
import { ThemeSettingsComponent } from './components/theme-settings/theme-settings.component';

const sharedModuleDeclarations = [
    // layout
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    // components
    ApiDefTableComponent,
    DemoComponent,
    CodeSnippetComponent,
    ThemeColorComponent,
    ThemeSettingsComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        SliceKitModule,
    ],
    declarations: sharedModuleDeclarations,
    exports: [
        ...sharedModuleDeclarations,
        SliceKitModule,
        HighlightModule,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
