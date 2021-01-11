import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { GuidesRoutingModule } from './guides-routing.module';
// ui-kit rules and docs
import { GuidesComponent } from './guides.component';
import { ColorsComponent } from './colors/colors.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { GlyphsComponent } from './glyphs/glyphs.component';
import { HomeComponent } from './home/home.component';
import { I18nComponent } from './i18n/i18n.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { MdUsageComponent } from './md-usage/md-usage.component';
import { SchematicsComponent } from './schematics/schematics.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TextStylesComponent } from './text-styles/text-styles.component';
import { ThemingComponent } from './theming/theming.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    ColorsComponent,
    GetStartedComponent,
    GlyphsComponent,
    GuidesComponent,
    HomeComponent,
    I18nComponent,
    ImagesGridComponent,
    MdUsageComponent,
    SchematicsComponent,
    StyleGuideComponent,
    TextStylesComponent,
    ThemingComponent,
];

@NgModule({
    imports: [
        CommonModule,
        SliceKitModule,
        GuidesRoutingModule,
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
