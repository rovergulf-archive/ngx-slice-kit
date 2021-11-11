import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';
import { AlertService } from '../../../../../libs/ngx-slice-kit/src/lib/modals/alert/alert.service';

@Component({
    selector: 'app-demo-switches',
    templateUrl: './demo-toggle.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoToggleComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('smallRef', {static: true}) smallRef: any;
    @ViewChild('disabledRef', {static: true}) disabledRef: any;

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
            title: 'Toggle component examples',
            subtitle: 'Toggle is an on/off control that can be toggled via clicking.',
            demos: [
                {
                    title: 'Default',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<sdk-toggle [(ngModel)]="active"></sdk-toggle>`,
                        module: `import { ToggleModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add ToggleModule export
        ToggleModule,
    ],
})
export class DemoToggleModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-toggle',
    templateUrl: './demo-toggle.component.html',
    styleUrls: ['./demo-toggle.component.scss']
})
export class DemoToggleComponent {

    active: boolean = true;

    constructor() {
    }

}`,
                    },
                },
                {
                    title: 'Small',
                    description: '',
                    templateRef: this.smallRef,
                    values: {
                        html: `<sdk-toggle [small]="true"></sdk-toggle>`,
                    },
                },
                {
                    title: 'Disabled',
                    description: '',
                    templateRef: this.disabledRef,
                    values: {
                        html: `<sdk-toggle [disabled]="true"></sdk-toggle>`
                    },
                }
            ],
            apis: [
                {
                    label: '[isActive]',
                    type: 'boolean',
                    description: 'Component state value',
                    required: false,
                },
                {
                    label: '[small]',
                    type: 'boolean',
                    description: 'Small sized toggle',
                    required: false,
                },
                {
                    label: '[disabled]',
                    type: 'boolean',
                    description: 'Disable component interaction',
                    required: false,
                },
            ],
        };
    }

}
