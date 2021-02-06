import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesComponent } from './badges.component';


@NgModule({
    declarations: [
        BadgesComponent
    ],
    exports: [
        BadgesComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BadgesModule {
}
