import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayDirective } from './overlay.directive';

const moduleDeclarations = [
    OverlayComponent,
    OverlayDirective,
];

@NgModule({
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    imports: [
        CommonModule
    ]
})
export class OverlayModule {
}
