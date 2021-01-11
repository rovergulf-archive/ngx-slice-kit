import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoDashboardCardComponent } from './demo-dashboard-card/demo-dashboard-card.component';
import { DemoShoppingCardComponent } from './demo-shopping-card/demo-shopping-card.component';
import { DemoSocialCardComponent } from './demo-social-card/demo-social-card.component';
import { DemoTextCardComponent } from './demo-text-card/demo-text-card.component';

const routes: Routes = [
    {path: 'dashboard', component: DemoDashboardCardComponent},
    {path: 'social', component: DemoSocialCardComponent},
    {path: 'shopping', component: DemoShoppingCardComponent},
    {path: 'text', component: DemoTextCardComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoCardsRoutingModule {
}
