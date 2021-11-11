import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss', '../../docs.module.scss'],
})
export class DemoTabsComponent implements OnInit {

    @ViewChild('basicRef', {static: true}) basicRef: any;

    page: DemoPageModel;
    tabs: any[] = [
        {
            label: 'Color Tab',
            title: 'Pick color',
            data: [
                { value: 0, name: 'Red'},
                { value: 1, name: 'Blue'},
                { value: 2, name: 'Green'},
            ]
        },
        {
            label: 'Disable tab',
            disabled: true
        },
        {
            label: 'Fruit Tab',
            title: 'Pick fruit',
            data: [
                { value: 0, name: 'Mango'},
                { value: 1, name: 'Banana'},
                { value: 2, name: 'Mandarin'},
            ]
        },
        {
            label: 'Drink Tab',
            title: 'Pick drink',
            data: [
                { value: 0, name: 'Milkshake'},
                { value: 1, name: 'Kombucha'},
                { value: 2, name: 'Smoothie'},
            ]
        },
        {
            label: 'Another disable Tab',
            disabled: true
        },
        {
            label: 'Game Tab',
            title: 'Pick game',
            data: [
                { value: 0, name: 'Streets of Rage'},
                { value: 1, name: 'Earthworm Jim'},
                { value: 2, name: 'Zero Tolerance'},
            ]
        },
        {
            label: 'Movie Tab',
            title: 'Pick movie',
            data: [
                { value: 0, name: 'God Father'},
                { value: 1, name: 'Forrest Gump'},
                { value: 2, name: 'Lord Of The Rings'},
            ]
        },
    ];

    constructor() {}

    ngOnInit(): void {
        this.page = {
            title: 'Tabs usage example',
            subtitle: '',
            demos: [
                {
                    title: 'Tabs',
                    description: '',
                    templateRef: this.basicRef,
                    values: {
                        html: `<section class="tabs-container">
    <h1>Tabs</h1>
    <sdk-tab-group [animation]="true">
        <sdk-tab *ngFor="let tab of tabs" [label]="tab.label" [disabled]="tab.disabled">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">{{tab.title}}</h2>
                <sdk-radio [data]="tab.data"></sdk-radio>
            </div>
        </sdk-tab>
    </sdk-tab-group>
</section>`,
                        module: `import { TabsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add TabsModule to app imports
        TabsModule,
    ],
})
export class DemoTabsModule {
}`,
                        styles: `.demo-tabs__title {
  margin-bottom: 24px;
}

.tabs-container {
    width: 100%;
}

.tab-wrapper {
    padding: 24px;
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent {

    tabs: any[] = [
        {
            label: 'Color Tab',
            title: 'Pick color',
            data: [
                { value: 0, name: 'Red'},
                { value: 1, name: 'Blue'},
                { value: 2, name: 'Green'},
            ]
        },
        {
            label: 'Disable tab',
            disabled: true
        },
        {
            label: 'Fruit Tab',
            title: 'Pick fruit',
            data: [
                { value: 0, name: 'Mango'},
                { value: 1, name: 'Banana'},
                { value: 2, name: 'Mandarin'},
            ]
        },
        {
            label: 'Drink Tab',
            title: 'Pick drink',
            data: [
                { value: 0, name: 'Milkshake'},
                { value: 1, name: 'Kombucha'},
                { value: 2, name: 'Smoothie'},
            ]
        },
        {
            label: 'Another disable Tab',
            disabled: true
        },
        {
            label: 'Game Tab',
            title: 'Pick game',
            data: [
                { value: 0, name: 'Streets of Rage'},
                { value: 1, name: 'Earthworm Jim'},
                { value: 2, name: 'Zero Tolerance'},
            ]
        },
        {
            label: 'Movie Tab',
            title: 'Pick movie',
            data: [
                { value: 0, name: 'God Father'},
                { value: 1, name: 'Forrest Gump'},
                { value: 2, name: 'Lord Of The Rings'},
            ]
        },
    ];

    constructor() {
    }

}`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'TabsComponent',
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
                        }
                    ]
                }
            ]
        };
    }
}
