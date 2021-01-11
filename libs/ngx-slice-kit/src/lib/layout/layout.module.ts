import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {AccordionComponent} from './accordion/accordion.component';
// import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
// import {CalendarComponent} from './calendar/calendar.component';
// import {ChartsComponent} from './charts/charts.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DividerComponent } from './divider/divider.component';
// import {DragNDropComponent} from './drag-n-drop/drag-n-drop.component';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressComponent } from './progress/progress.component';
import { SlideComponent } from './carousel/slide/slide.component';
import { SliderComponent } from './slider/slider.component';
import { TableComponent } from './table/table.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { DotsComponent } from './dots/dots.component';

const moduleDeclarations = [
    // AccordionComponent,
    // BreadcrumbsComponent,
    // CalendarComponent,
    CarouselComponent,
    // ChartsComponent,
    DividerComponent,
    DotsComponent,
    // DragNDropComponent,
    ListComponent,
    PaginationComponent,
    ProgressComponent,
    SlideComponent,
    SliderComponent,
    TableComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class LayoutModule {
}
