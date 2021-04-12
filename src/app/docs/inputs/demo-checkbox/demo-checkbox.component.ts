import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';
import { AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-checkbox',
    templateUrl: './demo-checkbox.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoCheckboxComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('statesRef', {static: true}) statesRef: any;

    page: DemoPageModel;

    active: boolean = true;

    constructor(
        private alerts: AlertService
    ) {
    }

    toggleActive(): void {
        this.active = !this.active;
    }

    showState(ev: any): void {
        this.alerts.success({
            message: `DemoCheckboxComponent.active = ${ev}`,
            positionY: 'bottom'
        });
    }

    ngOnInit(): void {
        this.page = {
            title: 'Checkboxs usage example',
            subtitle: '',
            demos: [
                {
                    title: 'Basic example',
                    description: 'Checkbox represents native <input type="checkbox" /> element, handled in ngx-slice-kit way',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<sdk-checkbox [(ngModel)]="active">Default checkbox</sdk-checkbox>
<sdk-checkbox [small]="true">Small sized</sdk-checkbox>`,
                        module: `import { CheckboxModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add CheckboxModule to app imports
        CheckboxModule,
    ],
})
export class DemoCheckboxModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-checkbox',
    templateUrl: './demo-checkbox.component.html',
    styleUrls: ['./demo-checkbox.component.scss']
})
export class DemoCheckboxComponent {

    active: boolean;

    constructor() {
    }

    toggleActive(): void {
        this.active = !this.active;
    }

}`,
                    },
                },
                {
                    title: 'Additional attributes example',
                    description: '',
                    templateRef: this.statesRef,
                    values: {
                        html: `<sdk-checkbox [error]="'Example error caption'" [required]="true">This checkbox is required</sdk-checkbox>
<sdk-checkbox [error]="'Example error caption'" [required]="true" [small]="true">Small but important</sdk-checkbox>
<sdk-checkbox [disabled]="true">Disabled state</sdk-checkbox>`,
                    },
                },
            ],
            apis: [
                {
                    label: '[isActive]',
                    type: 'boolean',
                    description: 'Controls component active state',
                },
                {
                    label: '[small]',
                    type: 'boolean',
                    description: 'Sets smile size style attributes for component',
                },
                {
                    label: '[required]',
                    type: 'boolean',
                    description: 'Sets required form state',
                },
                {
                    label: '[disabled]',
                    type: 'string',
                    description: 'disables component interaction.',
                },
            ]
        };
    }

}
