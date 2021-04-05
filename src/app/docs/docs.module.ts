import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { SliceKitModule } from 'ngx-slice-kit';
import { SharedModule } from '../shared/shared.module';
import { DocsRoutingModule } from './docs-routing.module';

import { DocumentsComponent } from './documents.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DocumentsComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // slice kit
        SliceKitModule,
        // internals
        SharedModule,
        DocsRoutingModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DocsModule {
}
