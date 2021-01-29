import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoLayoutRoutingModule } from './layout-routing.module';

import { DemoAccordionComponent } from './demo-accordion/demo-accordion.component';
import { DemoBreadcrumbsComponent } from './demo-breadcrumbs/demo-breadcrumbs.component';
import { DemoCarouselComponent } from './demo-carousel/demo-carousel.component';
import { DemoChartsComponent } from './demo-charts/demo-charts.component';
import { DemoCalendarComponent } from './demo-calendar/demo-calendar.component';
import { DemoDividerComponent } from './demo-divider/demo-divider.component';
import { DemoDragNDropComponent } from './demo-drag-n-drop/demo-drag-n-drop.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DemoPaginationComponent } from './demo-pagination/demo-pagination.component';
import { DemoProgressComponent } from './demo-progress/demo-progress.component';
import { DemoSlidesComponent } from './demo-slides/demo-slides.component';
import { DemoTableComponent } from './demo-table/demo-table.component';

const entryComponents = [];

const moduleDeclarations = [
  ...entryComponents,
  DemoAccordionComponent,
  DemoBreadcrumbsComponent,
  DemoCarouselComponent,
  DemoChartsComponent,
  DemoCalendarComponent,
  DemoDividerComponent,
  DemoDragNDropComponent,
  DemoListComponent,
  DemoPaginationComponent,
  DemoProgressComponent,
  DemoSlidesComponent,
  DemoTableComponent
];

@NgModule({
  imports: [
    CommonModule,
    DemoLayoutRoutingModule,
    SliceKitModule,
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
export class DemoLayoutModule {
}
