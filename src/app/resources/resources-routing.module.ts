import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourcesComponent } from './resources.component';
// children
import { AboutComponent } from './about/about.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

const routes: Routes = [
    {
        path: '',
        component: ResourcesComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'roadmap', component: RoadmapComponent},
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
