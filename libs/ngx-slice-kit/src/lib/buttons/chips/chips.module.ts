import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';


@NgModule({
    declarations: [
        ChipsComponent
    ],
    exports: [
        ChipsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ChipsModule {
}
