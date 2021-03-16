import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingDirective } from './loading.directive';


@NgModule({
    declarations: [
        LoadingComponent,
        LoadingDirective,
    ],
    imports: [
        CommonModule
    ]
})
export class LoadingModule {
}
