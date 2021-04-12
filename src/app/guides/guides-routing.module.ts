import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuidesComponent } from './guides.component';
// ui-kit rules and docs
import { GetStartedComponent } from './get-started/get-started.component';
import { GlyphsComponent } from './glyphs/glyphs.component';
import { HomeComponent } from './home/home.component';
import { I18nComponent } from './i18n/i18n.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { ThemingComponent } from './theming/theming.component';

const routes: Routes = [
    {
        path: '',
        component: GuidesComponent,
        children: [
            {path: 'home', component: HomeComponent},
            // {path: 'colors', component: ColorsComponent},
            {path: 'get-started', component: GetStartedComponent},
            {path: 'glyphs', component: GlyphsComponent},
            {path: 'i18n', component: I18nComponent},
            {path: 'adaptive-grid', component: ImagesGridComponent},
            {path: 'style-guide', component: StyleGuideComponent},
            {path: 'theming', component: ThemingComponent},
            {path: '', redirectTo: 'home', pathMatch: 'full'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuidesRoutingModule {
}
