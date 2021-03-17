import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {AccordionComponent} from './accordion/accordion.component';
// import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
// import {CalendarComponent} from './calendar/calendar.component';
// import {ChartsComponent} from './charts/charts.component';
// import {DragNDropComponent} from './drag-n-drop/drag-n-drop.component';
import { ButtonsModule } from '../buttons/buttons.module';
// import { AccordionModule } from './accordion/accordion.module';
// import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
// import { CalendarModule } from './calendar/calendar.module';
import { CarouselModule } from './carousel/carousel.module';
// import { ChartsModule } from './charts/charts.module';
import { DividerModule } from './divider/divider.module';
import { DotsModule } from './dots/dots.module';
// import { DragNDropModule } from './drag-n-drop/drag-n-drop.module';
import { ListModule } from './list/list.module';
import { LoadingModule } from './loading/loading.module';
import { PaginationModule } from './pagination/pagination.module';
import { ProgressModule } from './progress/progress.module';
import { SliderModule } from './slider/slider.module';
// import { TableModule } from './table/table.module';

const modules = [
    // AccordionModule,
    // BreadcrumbsModule,
    // CalendarModule,
    CarouselModule,
    // ChartsModule,
    DividerModule,
    DotsModule,
    // DragNDropModule,
    ListModule,
    // LoadingModule,
    PaginationModule,
    ProgressModule,
    SliderModule,
    // TableModule,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
    ],
    declarations: [],
    exports: [
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class LayoutModule {
}
