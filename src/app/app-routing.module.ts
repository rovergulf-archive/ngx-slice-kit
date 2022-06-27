import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path: 'guides', loadChildren: () => import('./guides/guides.module').then(m => m.GuidesModule)},
    {path: 'docs', loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule)},
    {path: 'resources', loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule)},
    {path: '', redirectTo: 'guides', pathMatch: 'full'},
    {path: '**', redirectTo: 'guides'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    relativeLinkResolution: 'legacy'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
