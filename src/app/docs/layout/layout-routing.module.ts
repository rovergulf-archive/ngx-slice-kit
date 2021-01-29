import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
    {path: 'accordion', component: DemoAccordionComponent},
    {path: 'breadcrumbs', component: DemoBreadcrumbsComponent},
    {path: 'calendar', component: DemoCalendarComponent},
    {path: 'carousel', component: DemoCarouselComponent},
    {path: 'charts', component: DemoChartsComponent},
    {path: 'divider', component: DemoDividerComponent},
    {path: 'drag-drop', component: DemoDragNDropComponent},
    {path: 'list', component: DemoListComponent},
    {path: 'pagination', component: DemoPaginationComponent},
    {path: 'progress', component: DemoProgressComponent},
    {path: 'table', component: DemoTableComponent},
    {path: 'slider', component: DemoSlidesComponent},
    {path: '', redirectTo: 'accordion', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoLayoutRoutingModule {
}
