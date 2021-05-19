import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss', '../../docs.module.scss'],
})
export class DemoTabsComponent implements OnInit, OnDestroy {

    @ViewChild('basicRef', {static: true}) basicRef: any;

    page: DemoPageModel;

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
                        html: `<div>
    <h1>Tabs</h1>
    <sdk-tab-group [animation]="true">
        <sdk-tab label="Tab 1" icon="star">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]">
                </sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Disabled Tab" [disabled]="true"></sdk-tab>
        <sdk-tab label="Super-mega-uber-extra-duper-long-tab">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Another-one-super-duper-extra-long-tab">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Test tab">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Next tab">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab5" icon="arrow-right">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Tab 2">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick color</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'red'}, {value: 1, name: 'blue'}, {value: 2, name: 'green'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick fruit</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'mango'}, {value: 1, name: 'banana'}, {value: 2, name: 'mandarin'}]"></sdk-radio>
                <h2 class="demo-tabs__title">Pick drink</h2>
                <sdk-radio
                    [data]="[{value: 0, name: 'milkshake'}, {value: 1, name: 'kombucha'}, {value: 2, name: 'smoothie'}]"></sdk-radio>
            </div>
        </sdk-tab>
        <sdk-tab label="Tab 2 very long sheeeit">
            <div class="tab-wrapper">
                <h2 class="demo-tabs__title">Pick movies</h2>
                <ul>
                    <li>
                        <div>Lord of the rings</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                    <li>
                        <div>Star wars</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                    <li>
                        <div>Pulp fiction</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                    <li>
                        <div>Watchmen</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                    <li>
                        <div>Joker</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                    <li>
                        <div>Gladiator</div>
                        <div>
                            <sdk-checkbox></sdk-checkbox>
                        </div>
                    </li>
                </ul>
            </div>
        </sdk-tab>
        <sdk-tab label="Tab 3">
            <div>
                <h1>Title 3</h1>
                Content 3
            </div>
        </sdk-tab>
    </sdk-tab-group>
</div>`,
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
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent {

    constructor() {
    }

}`,
                    },
                }
            ],
            apis: [
            ]
        };
    }

    ngOnDestroy(): void {}
}
