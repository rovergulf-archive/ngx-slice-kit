import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';
import {
    OPTIONS1,
    OPTIONS2,
    OPTIONS3,
    OPTIONS4,
    OPTIONS5,
    OPTIONS6,
    OPTIONS7
} from '../../../shared/values/dropdowns.values';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-select',
    templateUrl: './demo-select.component.html',
    styleUrls: ['./demo-select.component.scss', '../../docs.module.scss']
})
export class DemoSelectComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('captionRef', {static: true}) captionRef: any;
    @ViewChild('multiRef', {static: true}) multiRef: any;

    page: DemoPageModel;

    options1: OptionModel[];
    options2: OptionModel[];
    options3: OptionModel[];
    options4: OptionModel[];
    options5: OptionModel[];
    options6: OptionModel[];
    // options7: OptionModel[];

    multiValues1: Set<OptionModel>;
    multiValues2: Set<OptionModel>;
    singleVal1: OptionModel;
    singleVal2: OptionModel;
    singleVal3: OptionModel;
    singleVal4: OptionModel;
    // singleVal5: OptionModel;
    // singleVal6: OptionModel;

    constructor() {
    }

    onFirstValueChange(ev): void {
        // console.log('value changed', ev);
    }

    checkSelect(e): void {
        // console.log('selected values: ', e);
    }

    ngOnInit(): void {
        this.options1 = OPTIONS4;
        this.options2 = OPTIONS4;
        this.options3 = OPTIONS4;
        this.options4 = OPTIONS4;
        this.options5 = OPTIONS4;
        this.options6 = OPTIONS4;
        // this.options7 = OPTIONS7;

        this.multiValues2 = new Set([this.options6[1], this.options6[3]]);
        // this.singleVal1 = this.options1[1];
        // this.singleVal3 = this.options4[3];

        this.page = {
            title: 'Select component examples',
            subtitle: '',
            demos: [
                {
                    title: 'Default select',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="select-container">
    <div class="wrapper">
        <sdk-select [options]="options1"
                    [(ngModel)]="val1"
                    label="Pick material"></sdk-select>
    </div>
    <div class="wrapper">
        <sdk-select [options]="options2"
                    [small]="true"
                    [(ngModel)]="val2"
                    label="Pick material"></sdk-select>
    </div>
</div>`,
                        styles: `.select-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .wrapper {
        width: 100%;
        max-width: 320px;
        margin: 12px;
    }
}
`,
                        module: `import { SelectModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add SelectModule to app imports
        SelectModule,
    ],
})
export class SelectModule {
}`,
                        component: `import { Component } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';

const OPTIONS: OptionModel[] = [
    {value: 1, label: 'Wood'},
    {value: 2, label: 'Steel'},
    {value: 3, label: 'Plastic'},
    {value: 4, label: 'Rock'},
    {value: 5, label: 'Paper'},
    {value: 6, label: 'Leather'},
    {value: 7, label: 'Glass'},
];

@Component({
    selector: 'app-demo-autocomplete',
    templateUrl: './demo-select.component.html',
    styleUrls: ['./demo-select.component.scss']
})
export class DemoSelectComponent {

    this.options1 = OPTIONS;
    this.options2 = OPTIONS;

    val1: OptionModel;
    val2: OptionModel;

    constructor() {
    }
}`,
                    }
                },
                {
                    title: 'Caption & error',
                    description: '',
                    templateRef: this.captionRef,
                    values: {
                        html: `<div class="select-container">
    <div class="wrapper">
        <sdk-select [options]="options1"
                    [(ngModel)]="val1"
                    caption="Example caption"
                    label="Pick material"></sdk-select>
    </div>
    <div class="wrapper">
        <sdk-select [options]="options2"
                    [(ngModel)]="val2"
                    [error]="'Example error'"
                    label="Pick material"></sdk-select>
    </div>
</div>`,
                    }
                },
                {
                    title: 'Multiple values select',
                    description: '',
                    templateRef: this.multiRef,
                    values: {
                        html: `<div class="select-container">
    <div class="wrapper">
        <sdk-select [options]="options1"
                    [(ngModel)]="val1"
                    [enableNullValue]="true"
                    [multi]="true"
                    label="Multi-value select"
                    placeholder="Placeholder text"></sdk-select>
    </div>
    <div class="wrapper">
        <sdk-select [options]="options2"
                    [disabled]="true"
                    [(ngModel)]="val2"
                    [multi]="true"
                    label="Disabled select"></sdk-select>
    </div>
</div>`,
                        component: `import { Component } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';

const OPTIONS: OptionModel[] = [
    {value: 1, label: 'Wood'},
    {value: 2, label: 'Steel'},
    {value: 3, label: 'Plastic'},
    {value: 4, label: 'Rock'},
    {value: 5, label: 'Paper'},
    {value: 6, label: 'Leather'},
    {value: 7, label: 'Glass'},
];

@Component({
    selector: 'app-demo-autocomplete',
    templateUrl: './demo-select.component.html',
    styleUrls: ['./demo-select.component.scss']
})
export class DemoSelectComponent implements OnInit {

    this.options1 = OPTIONS;
    this.options2 = OPTIONS;

    val1: Set<OptionModel>;
    val2: Set<OptionModel>;

    constructor() {
    }

    ngOnInit(): void {
        this.val2 = new Set([this.options2[1], this.options2[3]]);
    }

}`,
                    }
                }
            ],
            api_groups: [
                {
                    name: 'SelectComponent',
                    apis: [
                        {
                            label: '[options]',
                            type: 'OptionModel[]',
                            description: 'Options list of select dropdown'
                        },
                        {
                            label: '[placeholder]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[label]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[caption]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[error]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[enableNullValue]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[multi]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[disabled]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[required]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '(focusEvent)',
                            type: 'EventEmitter',
                            description: `Emits focus select event at target subscription`,
                        },
                        {
                            label: '(blurEvent)',
                            type: 'EventEmitter',
                            description: `Emits blur select event at target subscription`,
                        },
                        {
                            label: '(resultEvent)',
                            type: 'EventEmitter',
                            description: `Emits result select event after option was selected`,
                        },
                    ]
                }
            ]
        };
    }

}
