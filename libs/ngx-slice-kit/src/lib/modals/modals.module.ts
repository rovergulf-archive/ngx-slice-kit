import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from './alert/alert.module';
import { BottomSheetModule } from './bottom-sheet/bottom-sheet.module';
import { DialogModule } from './dialog/dialog.module';
import { PopoverModule } from './popover/popover.module';
import { PopupModule } from './popup/popup.module';
import { TooltipModule } from './tooltip/tooltip.module';

const modules = [
    AlertModule,
    BottomSheetModule,
    DialogModule,
    PopoverModule,
    PopupModule,
    TooltipModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ModalsModule {
}
