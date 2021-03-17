import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide/slide.component';
import { CarouselComponent } from './carousel.component';
import { DotsModule } from '../dots/dots.module';
import { IconModule } from '../../buttons/icon/icon.module';
import { ButtonModule } from '../../buttons/button/button.module';


@NgModule({
    declarations: [
        SlideComponent,
        CarouselComponent
    ],
    exports: [
        SlideComponent,
        CarouselComponent
    ],
    imports: [
        CommonModule,
        DotsModule,
        IconModule,
        ButtonModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class CarouselModule {
}
