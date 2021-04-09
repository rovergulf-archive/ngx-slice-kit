import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-radio',
    templateUrl: './demo-radio.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoRadioComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('headerRef', {static: true}) headerRef: any;
    @ViewChild('errorRef', {static: true}) errorRef: any;
    @ViewChild('disabledRef', {static: true}) disabledRef: any;

    page: DemoPageModel;

    radioData = [
        {value: 1, name: 'Chiki'},
        {value: 2, name: 'Briki'}
    ];

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Radio component examples',
            subtitle: `Radio provides the same functionality as a native <input type="radio" /> enhanced with our styles and animations.`,
            demos: [
                {
                    title: 'Default',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="flex-column">
    <sdk-radio [data]="radioData" [required]="true"></sdk-radio>
    <sdk-radio [data]="radioData" [small]="true"></sdk-radio>
</div>`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class DemoRadioComponent implements OnInit {

    radioData = [
        {value: 1, name: 'Chiki'},
        {value: 2, name: 'Briki'}
    ];

    constructor() {
    }
}`,
                        module: `import { ToggleModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add RadioModule export
        RadioModule,
    ],
})
export class DemoToggleModule {
}`,
                    },
                },
                {
                    title: 'Label attribute specified',
                    description: '',
                    templateRef: this.headerRef,
                    values: {
                        html: `<div class="flex-column">
    <sdk-radio [data]="radioData" label="Radio"></sdk-radio>
    <sdk-radio [data]="radioData" [small]="true" label="Radio"></sdk-radio>
</div>`,
                    },
                },
                {
                    title: 'Error value support',
                    description: '',
                    templateRef: this.errorRef,
                    values: {
                        html: `<div class="flex-column">
    <sdk-radio [data]="radioData" error="Error radio"></sdk-radio>
    <sdk-radio [data]="radioData" [small]="true" error="Error radio"></sdk-radio>
</div>`,
                    },
                },
                {
                    title: 'Disabled attribute set to true',
                    description: '',
                    templateRef: this.disabledRef,
                    values: {
                        html: `<sdk-radio [data]="radioData" [disabled]="true"></sdk-radio>`,
                    },
                },
            ],
            apis: [
                {
                    label: '[label]',
                    type: 'string',
                    description: 'Label value',
                },
                {
                    label: '[data]',
                    type: 'any[]',
                    description: 'Array of values',
                    required: true,
                },
                {
                    label: '[small]',
                    type: 'boolean',
                    description: 'Small sized radio',
                },
                {
                    label: '[error]',
                    type: 'string',
                    description: 'Error caption text value',
                },
                {
                    label: '[required]',
                    type: 'boolean',
                    description: 'Defines if form value is required',
                },
                {
                    label: '[disabled]',
                    type: 'boolean',
                    description: 'Disable component interaction',
                },
            ],
        };
    }

    ngOnDestroy(): void {
    }

}
