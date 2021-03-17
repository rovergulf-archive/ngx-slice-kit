import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoAutocompleteComponent } from './demo-autocomplete/demo-autocomplete.component';
import { DemoDropdownComponent } from './demo-dropdown/demo-dropdown.component';
import { DemoSelectComponent } from './demo-select/demo-select.component';

const routes: Routes = [
    {path: 'autocomplete', component: DemoAutocompleteComponent},
    {path: 'context', component: DemoDropdownComponent},
    {path: 'select', component: DemoSelectComponent},
    {path: '', redirectTo: 'autocomplete', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoDropdownRoutingModule {
}
