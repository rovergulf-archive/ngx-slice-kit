import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-slides',
    templateUrl: './demo-slides.component.html',
    styleUrls: ['demo-slides.component.scss' , '../../demo.module.scss']
})
export class DemoSlidesComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('valRef', {static: true}) valRef: any;
    @ViewChild('smallRef', {static: true}) smallRef: any;
    @ViewChild('multiRef', {static: true}) multiRef: any;

    page: DemoPageModel;

    value: number = 20;
    secValue: number = 60;
    thirdValue: number = 3;
    fourthValue: { min: number, max: number } = {min: 0, max: 20};

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Slider component example',
            subtitle: '',
            demos: [
                {
                    title: 'Default slider',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="slider-wrapper">
    <sdk-slider (changed)="setValue($event)" [max]="60" [min]="20" [step]="5"></sdk-slider>
    <div>{{value}}</div>
</div>`,
                        styles: `.slider-wrapper {
    width: 100%;
}`,
                        module: `import { SliderModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add SliderModule to app imports
        SliderModule,
    ],
})
export class DemoSliderModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-slides',
    templateUrl: './demo-slides.component.html',
    styleUrls: ['./demo-slides.component.scss']
})
export class DemoSlidesComponent {

    value: number = 20;

    constructor() {
    }

    setValue(e): void {
        this.value = e;
    }
}`,
                    },
                },
                {
                    title: 'Small slider',
                    description: '',
                    templateRef: this.smallRef,
                    values: {
                        html: `<div class="slider-wrapper">
    <sdk-slider (changed)="setValue($event)" [max]="10" [min]="0" [small]="true" [step]="2"
                [value]="3"></sdk-slider>
    <div>{{value}}</div>
</div>`,
                    },
                },
                {
                    title: 'Multi-slider',
                    description: '',
                    templateRef: this.multiRef,
                    values: {
                        html: `<div class="slider-wrapper">
    <sdk-slider (changed)="setValue($event)" [max]="20" [multiple]="true"></sdk-slider>
    <div>min: {{value.min}}, max: {{value.max}}</div>
</div>`,
                    },
                },
            ],
            api_groups: [
                {
                    name: 'SliderComponent',
                    apis: [
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: 'Default value: false',
                        },
                        {
                            label: '[disabled]',
                            type: 'boolean',
                            description: 'Default value: false',
                        },
                        {
                            label: '[multiple]',
                            type: 'boolean',
                            description: 'Allows to set the range by two sliders. Default value: false',
                        },
                        {
                            label: '[min]',
                            type: 'number',
                            description: 'Default value: 0',
                        },
                        {
                            label: '[max]',
                            type: 'number',
                            description: 'Default value: 100',
                        },
                        {
                            label: '[step]',
                            type: 'number',
                            description: 'Default value: 1',
                        },
                        {
                            label: '[color]',
                            type: 'string',
                            description: 'Default value: primary',
                        },
                        {
                            label: '[value]',
                            type: 'any',
                            description: 'Set initial value',
                        },
                        {
                            label: '(changed)',
                            type: 'EventEmitter',
                            description: 'Emits slider value change event',
                        },
                        {
                            label: '(moved)',
                            type: 'EventEmitter',
                            description: 'Emits event when slider was moved',
                        },
                    ],
                }
            ],
        };
    }

    setValue(e): void {
        this.value = e;
    }

    setSecValue(e): void {
        this.secValue = e;
    }

    setThirdValue(e): void {
        this.thirdValue = e;
    }

    setFourthValue(e): void {
        this.fourthValue = e;
    }

}
