import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { I17rPipe } from './i17r/i17r.pipe';
import { LoadingComponent } from './loading/loading.component';
import { LoadingDirective } from './loading/loading.directive';
import { MarkdownComponent } from './markdown/markdown.component';
import { MarkdownDirective } from './markdown/markdown.directive';
import { MarkdownPipe } from './markdown/markdown.pipe';
import { NavigationScrollDirective } from './directives/navigation-scroll.directive';

const moduleDeclarations = [
    I17rPipe,
    LoadingComponent,
    LoadingDirective,
    MarkdownComponent,
    MarkdownDirective,
    MarkdownPipe,
    NavigationScrollDirective,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class CoreModule {
}

