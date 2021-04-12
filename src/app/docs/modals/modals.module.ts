import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DemoModalsRoutingModule } from './modals-routing.module';

import { DemoAlertsComponent } from './demo-alerts/demo-alerts.component';
import { DemoBottomSheetComponent } from './demo-bottom-sheet/demo-bottom-sheet.component';
import { DemoDialogComponent } from './demo-dialog/demo-dialog.component';
import { DemoDialogPreviewComponent } from './demo-dialog/demo-dialog-preview/demo-dialog-preview.component';
import { DemoDialogPreview2Component } from './demo-dialog/demo-dialog-preview2/demo-dialog-preview2.component';
import { DemoPopoverComponent } from './demo-popover/demo-popover.component';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { DemoTooltipComponent } from './demo-tooltip/demo-tooltip.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoAlertsComponent,
    DemoBottomSheetComponent,
    DemoDialogComponent,
    DemoDialogPreviewComponent,
    DemoDialogPreview2Component,
    DemoPopoverComponent,
    DemoPopupComponent,
    DemoTooltipComponent,
];

@NgModule({
    imports: [
        CommonModule,
        DemoModalsRoutingModule,
        SharedModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DemoModalsModule {
}
