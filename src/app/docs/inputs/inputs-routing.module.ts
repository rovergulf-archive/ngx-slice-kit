import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoCheckboxComponent } from './demo-checkbox/demo-checkbox.component';
import { DemoDatepickerComponent } from './demo-datepicker/demo-datepicker.component';
import { DemoInputsComponent } from './demo-inputs/demo-inputs.component';
import { DemoRadioComponent } from './demo-radio/demo-radio.component';
import { DemoToggleComponent } from './demo-toggle/demo-toggle.component';
import { DemoTextareaComponent } from './demo-textarea/demo-textarea.component';
import { DemoWysiwygComponent } from './demo-wysiwyg/demo-wysiwyg.component';

const routes: Routes = [
    {path: 'input', component: DemoInputsComponent},
    {path: 'checkbox', component: DemoCheckboxComponent},
    {path: 'datepicker', component: DemoDatepickerComponent},
    {path: 'textarea', component: DemoTextareaComponent},
    {path: 'radio', component: DemoRadioComponent},
    {path: 'toggle', component: DemoToggleComponent},
    {path: 'wysiwyg', component: DemoWysiwygComponent},
    {path: '', redirectTo: 'input', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoInputsRoutingModule {
}
