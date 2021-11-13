import {Component, OnInit, ViewChild} from '@angular/core';
import {DemoPageModel} from '../../../shared/model';

@Component({
    selector: 'app-demo-progress',
    templateUrl: './demo-progress.component.html',
    styleUrls: ['./demo-progress.component.scss', '../../demo.module.scss']
})
export class DemoProgressComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('smallRef', {static: true}) smallRef: any;

    page: DemoPageModel;

    value: number = 0;
    smallValue: number = 0;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Progress component example',
            subtitle: '',
            demos: [
                {
                    title: 'Default progress bar',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="progress-wrapper">
    <sdk-progress [value]="value"></sdk-progress>
    <div class="button-wrapper">
        <button (click)="valueChange(5)" color="primary" sdk-flat-button>Increase progress</button>
        <button (click)="valueChange(-5)" color="primary" sdk-flat-button>Decrease progress</button>
    </div>
</div>`,
                        styles: `.button-wrapper {
    display: flex;
    margin-top: 24px;

    button {
        margin-right: 24px;
    }
}

.progress-wrapper {
    margin-top: 32px;
    width: 100%;
}`,
                        module: `import { ProgressModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add ProgressModule to app imports
        ProgressModule,
    ],
})
export class DemoProgressModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-progress',
    templateUrl: './demo-progress.component.html',
    styleUrls: ['./demo-progress.component.scss']
})
export class DemoProgressComponent {

    value: number = 0;

    constructor() {
    }

    valueChange(n: number): void {
        if (this.value + n < 0) {
            return;
        }
        this.value += n;
    }
}`,
                    },
                },
                {
                    title: 'Small progress bar',
                    description: '',
                    templateRef: this.smallRef,
                    values: {
                        html: `<div class="progress-wrapper">
    <sdk-progress [small]="true" [value]="value"></sdk-progress>
    <div class="button-wrapper">
        <button (click)="valueChange(1)" color="primary" sdk-flat-button>Increase progress</button>
        <button (click)="valueChange(-1)" color="primary" sdk-flat-button>Decrease progress</button>
    </div>
</div>`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'ProgressComponent',
                    apis: [
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: 'Default value: false',
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
                            label: '[value]',
                            type: 'number',
                            description: 'Required property to control progress filling',
                        }
                    ],
                }
            ],
        };
    }

    valueChange(n: number): void {
        if (this.value + n < 0 || this.value + n > 100) {
            return;
        }
        this.value += n;
    }

    smallValueChange(n: number): void {
        if (this.smallValue + n < 0 || this.smallValue + n > 100) {
            return;
        }
        this.smallValue += n;
    }
}
