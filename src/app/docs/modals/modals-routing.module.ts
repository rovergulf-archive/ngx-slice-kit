import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoAlertsComponent } from './demo-alerts/demo-alerts.component';
import { DemoBottomSheetComponent } from './demo-bottom-sheet/demo-bottom-sheet.component';
import { DemoDialogComponent } from './demo-dialog/demo-dialog.component';
import { DemoPopoverComponent } from './demo-popover/demo-popover.component';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { DemoTooltipComponent } from './demo-tooltip/demo-tooltip.component';

const routes: Routes = [
    {path: 'alert', component: DemoAlertsComponent},
    {path: 'bottom-sheet', component: DemoBottomSheetComponent},
    {path: 'dialog', component: DemoDialogComponent},
    {path: 'popover', component: DemoPopoverComponent},
    {path: 'popup', component: DemoPopupComponent},
    {path: 'tooltip', component: DemoTooltipComponent},
    {path: '', redirectTo: 'alert', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoModalsRoutingModule {
}
