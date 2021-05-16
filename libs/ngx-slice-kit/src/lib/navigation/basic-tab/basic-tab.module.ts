import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTabComponent } from './basic-tab.component';
import { IconModule } from '../../buttons/icon/icon.module';


@NgModule({
    declarations: [
        BasicTabComponent
    ],
    exports: [
        BasicTabComponent
    ],
    imports: [
        CommonModule,
        IconModule
    ]
})
export class BasicTabModule {
}
