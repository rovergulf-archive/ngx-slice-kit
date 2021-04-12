import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightModule } from 'ngx-highlightjs';

import { GuidesRoutingModule } from './guides-routing.module';
// ui-kit rules and docs
import { SharedModule } from '../shared/shared.module';
import { GuidesComponent } from './guides.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { GlyphsComponent } from './glyphs/glyphs.component';
import { I18nComponent } from './i18n/i18n.component';
import { HomeComponent } from './home/home.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { ThemingComponent } from './theming/theming.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    GetStartedComponent,
    GlyphsComponent,
    GuidesComponent,
    HomeComponent,
    I18nComponent,
    ImagesGridComponent,
    ThemingComponent,
];

@NgModule({
    imports: [
        CommonModule,
        HighlightModule,
        GuidesRoutingModule,
        SharedModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class GuidesModule {
}
