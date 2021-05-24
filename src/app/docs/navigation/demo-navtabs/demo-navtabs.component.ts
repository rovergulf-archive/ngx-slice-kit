import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss', '../../docs.module.scss']
})
export class DemoNavtabsComponent implements OnInit {

    @ViewChild('basicRef', {static: true}) basicRef: any;

    page: DemoPageModel;

    links = [
        {src: 'demo-first', label: 'Lord of the rings: Return of the King'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: true},
        {src: 'demo-third', label: 'Millennium falcon'},
        {src: 'demo-fourth', label: 'Lord of the rings: The Fellowship of the Ring'},
        {src: 'demo-fifth', label: 'Lord of the rings: The Two Towers'},
        {src: 'demo-sixth', label: 'Disabled tab', disabled: true},
        {src: 'demo-seventh', label: 'The Empire strikes back'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Nav-tabs usage example',
            subtitle: '',
            demos: [
                {
                    title: 'Nav-tabs',
                    description: '',
                    templateRef: this.basicRef,
                    values: {
                        html: `<section class="flex-column tabs-container">
    <h2>Nav tabs</h2>
    <div class="example flex-column layout-start-stretch">
        <sdk-nav-tab-group [animation]="true" [minHeight]="1048">
            <a sdkTabLink *ngFor="let link of links"
               [disabled]="link.disabled"
               [routerLink]="link.src"
               [label]="link.label"></a>
        </sdk-nav-tab-group>
    </div>
</section>`,
                        styles: `.tabs-container {
    width: 100%;
}
`,
                        ['demo.module.ts']: `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Your page components imports...

const components = [
  DemoPageOneComponent,
  DemoPageTwoComponent,
  DemoPageThreeComponent,
  DemoPageFourComponent,
  DemoPageFiveComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    // Your routing module for components of nav-tabs
    DemoRoutingModule,
  ]
})
export class DemoModule { }`,
                        ['demo-routing.module.ts']: `import { NgModule } from '@angular/core';
// Your page components imports...

const routes: Routes = [
  {path: 'demo-first', component: DemoPageOneComponent, data: {index: 1}},
  {path: 'demo-second', component: DemoPageTwoComponent, data: {index: 2}},
  {path: 'demo-third', component: DemoPageThreeComponent, data: {index: 3}},
  {path: 'demo-fourth', component: DemoPageFourComponent, data: {index: 4}},
  {path: 'demo-fifth', component: DemoPageFiveComponent, data: {index: 5}},
  {path: 'demo-sixth', component: DemoPageOneComponent, data: {index: 6}},
  {path: 'demo-seventh', component: DemoPageTwoComponent, data: {index: 7}},
  {path: 'demo-eighth', component: DemoPageThreeComponent, data: {index: 8}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {
}`,
                        module: `import { NavTabsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add NavTabsModule to app imports
        NavTabsModule,
        DemoModule,
    ],
})
export class DemoNavTabsModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss']
})
export class DemoNavtabsComponent {

    links = [
        {src: 'demo-first', label: 'Lord of the rings: Return of the King'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: true},
        {src: 'demo-third', label: 'Millennium falcon'},
        {src: 'demo-fourth', label: 'Lord of the rings: The Fellowship of the Ring'},
        {src: 'demo-fifth', label: 'Lord of the rings: The Two Towers'},
        {src: 'demo-sixth', label: 'Disabled tab', disabled: true},
        {src: 'demo-seventh', label: 'The Empire strikes back'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];

    constructor() {
    }

}`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'NavTabsComponent',
                    apis: [
                        {
                            label: 'activeTabStyle',
                            type: 'string',
                            description: `Sets the way the element is highlighted. Valid values: "border" | "fill"`,
                            default_value: 'border'
                        },
                        {
                            label: 'animation',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: 'minHeight',
                            type: 'number',
                            description: 'Set min height of container',
                            default_value: 0
                        }
                    ]
                }
            ]
        };
    }
}
