import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoBadgesComponent } from './demo-badges/demo-badges.component';
import { DemoButtonsComponent } from './demo-buttons/demo-buttons.component';
import { DemoChipsComponent } from './demo-chips/demo-chips.component';
import { DemoIconComponent } from './demo-icon/demo-icon.component';
import { DemoRippleComponent } from './demo-ripple/demo-ripple.component';
import { DemoSegmentedComponent } from './demo-segmented/demo-segmented.component';
import { DemoStepperComponent } from './demo-stepper/demo-stepper.component';

const routes: Routes = [
    {path: 'badges', component: DemoBadgesComponent},
    {path: 'button', component: DemoButtonsComponent},
    {path: 'chips', component: DemoChipsComponent},
    {path: 'icon', component: DemoIconComponent},
    {path: 'ripple', component: DemoRippleComponent},
    {path: 'segmented', component: DemoSegmentedComponent},
    {path: 'stepper', component: DemoStepperComponent},
    {path: '', redirectTo: 'button', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoButtonsRoutingModule {
}
