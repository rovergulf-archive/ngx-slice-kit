import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourcesComponent } from './resources.component';
// children
import { AboutComponent } from './about/about.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SliceDesignComponent } from './slice-design/slice-design.component';

const routes: Routes = [
    {
        path: '',
        component: ResourcesComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'roadmap', component: RoadmapComponent},
            {path: 'slice-design', component: SliceDesignComponent},
            {path: '', redirectTo: 'about', pathMatch: 'full'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
