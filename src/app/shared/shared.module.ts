import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
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
        HighlightModule,
        SliceKitModule,
    ],
    declarations: sharedModuleDeclarations,
    exports: [
        ...sharedModuleDeclarations,
        SliceKitModule
    ],
    entryComponents,
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    scss: () => import('highlight.js/lib/languages/scss'),
                    css: () => import('highlight.js/lib/languages/css'),
                }
            }
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
