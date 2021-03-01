import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { DemoSidenavComponent } from './demo-sidenav/demo-sidenav.component';
import { DemoTabsComponent } from './demo-tabs/demo-tabs.component';
import { DemoNavtabsComponent } from './demo-navtabs/demo-navtabs.component';

import { DemoPageOneComponent } from './demos/page-one/page-one.component';
import { DemoPageTwoComponent } from './demos/page-two/page-two.component';
import { DemoPageThreeComponent } from './demos/page-three/page-three.component';
import { DemoPageFourComponent } from './demos/page-four/page-four.component';
import { DemoPageFiveComponent } from './demos/page-five/page-five.component';

const routes: Routes = [
    {
        path: 'menu',
        component: DemoMenuComponent,
        children: [
            {path: 'page1', component: DemoPageOneComponent},
            {path: 'page2', component: DemoPageTwoComponent},
            {path: 'sub1/sub/page1', component: DemoPageThreeComponent},
            {path: 'sub1/page1', component: DemoPageFourComponent},
            {path: 'sub2/page3', component: DemoPageFiveComponent},
        ]
    },
    {path: 'sidenav', component: DemoSidenavComponent},
    {path: 'tabs', component: DemoTabsComponent},
    {
        path: 'navtabs',
        component: DemoNavtabsComponent,
        children: [
            {path: '', redirectTo: 'demo-first', pathMatch: 'full'},
            {path: 'demo-first', component: DemoPageOneComponent, data: {num: 1}},
            {path: 'demo-second', component: DemoPageTwoComponent, data: {num: 2}},
            {path: 'demo-third', component: DemoPageThreeComponent, data: {num: 3}},
            {path: 'demo-fourth', component: DemoPageFourComponent, data: {num: 4}},
            {path: 'demo-fifth', component: DemoPageFiveComponent, data: {num: 5}},
            {path: 'demo-sixth', component: DemoPageOneComponent, data: {num: 6}},
            {path: 'demo-seventh', component: DemoPageTwoComponent, data: {num: 7}},
            {path: 'demo-eighth', component: DemoPageThreeComponent, data: {num: 8}},
        ]
    },
    {path: '', redirectTo: 'menu', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoNavigationRoutingModule {
}
