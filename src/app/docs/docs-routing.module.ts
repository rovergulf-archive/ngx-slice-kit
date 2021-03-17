import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
    {
        path: '',
        component: DocumentsComponent,
        children: [
            {path: 'buttons', loadChildren: () => import('./buttons/buttons.module').then(m => m.DemoButtonsModule)},
            {path: 'inputs', loadChildren: () => import('./inputs/inputs.module').then(m => m.DemoInputsModule)},
            {
                path: 'dropdown',
                loadChildren: () => import('./dropdown/dropdown.module').then(m => m.DemoDropdownModule)
            },
            {path: 'modals', loadChildren: () => import('./modals/modals.module').then(m => m.DemoModalsModule)},
            {path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.DemoCardsModule)},
            {path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.DemoLayoutModule)},
            {path: 'media', loadChildren: () => import('./media/media.module').then(m => m.DemoMediaModule)},
            {
                path: 'navigation',
                loadChildren: () => import('./navigation/navigation.module').then(m => m.DemoNavigationModule)
            },
            {path: '', redirectTo: 'buttons', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule {
}
