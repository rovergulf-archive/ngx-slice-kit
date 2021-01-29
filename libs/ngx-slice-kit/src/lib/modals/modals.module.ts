import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from '../buttons/buttons.module';

import { AlertComponent } from './alert/alert.component';
import { AlertsComponent } from './alert/alerts.component';
import { PopupComponent } from './popup/popup.component';
import { DialogComponent } from './dialog/dialog.component';
// import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import { DialogDirective } from './dialog/dialog.directive';
// import {PopoverComponent} from './popover/popover.component';
import { PopupDirective } from './popup/popup.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { AlertDirective } from './alert/alert.directive';
import { OverlayModule } from '../overlay/overlay.module';

const moduleDirectives = [
    AlertDirective,
    DialogDirective,
    PopupDirective,
    TooltipDirective,
];

const moduleDeclarations = [
    AlertComponent,
    AlertsComponent,
    // BottomSheetComponent,
    DialogComponent,
    // PopoverComponent,
    PopupComponent,
    ...moduleDirectives,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
        OverlayModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ModalsModule {
}
