import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoButtonsRoutingModule } from './buttons-routing.module';

import { DemoBadgesComponent } from './demo-badges/demo-badges.component';
import { DemoButtonsComponent } from './demo-buttons/demo-buttons.component';
import { DemoChipsComponent } from './demo-chips/demo-chips.component';
import { DemoIconComponent } from './demo-icon/demo-icon.component';
import { DemoRippleComponent } from './demo-ripple/demo-ripple.component';
import { DemoSegmentedComponent } from './demo-segmented/demo-segmented.component';
import { DemoStepperComponent } from './demo-stepper/demo-stepper.component';
import {SharedModule} from '../../shared/shared.module';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    DemoBadgesComponent,
    DemoButtonsComponent,
    DemoChipsComponent,
    DemoIconComponent,
    DemoRippleComponent,
    DemoSegmentedComponent,
    DemoStepperComponent,
];

@NgModule({
    imports: [
        CommonModule,
        DemoButtonsRoutingModule,
        SliceKitModule,
        SharedModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class DemoButtonsModule {
}
