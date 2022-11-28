import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'guides',
        title: 'NGX Slice Kit - Angular components',
        loadChildren: () => import('./guides/guides.module').then(m => m.GuidesModule),
    },
    {
        path: 'docs',
        title: 'Documentation - NGX Slice Kit',
        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule)
    },
    {
        title: 'Resources - NGX Slice Kit',
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule)
    },
    {
        path: '', redirectTo: 'guides', pathMatch: 'full',
    },
    {
        path: '**', redirectTo: 'guides',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
