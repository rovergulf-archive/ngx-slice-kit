import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertOptions, AlertService} from 'ngx-slice-kit';
import {DemoPageModel} from '../../../shared/model';

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss', '../../docs.module.scss']
})
export class DemoAlertsComponent implements OnInit {

    @ViewChild('sucErrRef', {static: true}) sucErrRef: any;
    @ViewChild('actionRef', {static: true}) actionRef: any;
    @ViewChild('positionsRef', {static: true}) positionsRef: any;

    page: DemoPageModel;

    firstCount: number = 0;
    secondCount: number = 0;
    options: AlertOptions[] = [
        { // 0
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
        },
        { // 1
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
            positionX: 'left'
        },
        { // 2
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
            positionX: 'center',
        },
        { // 3
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
            positionY: 'bottom'
        },
        { // 4
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
            positionX: 'left',
            positionY: 'bottom',
        },
        { // 5
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away. ',
            positionX: 'center',
            positionY: 'bottom'
        },
        { // 6
            title: 'Success',
            message: 'Realm of the galaxies decipherment venture take root and flourish permanence of the stars hearts of the stars. '
        },
        { // 7
            title: 'Error',
            message: 'Cosmic ocean Apollonius of Perga rich in mystery tingling of the spine colonies dream of the mind\'s eye.'
        },
        { // 8
            title: 'Bebep bop zeeep',
            message: 'Kindling the energy hidden in matter consciousness preserve and cherish that pale blue dot from which we spring encyclopaedia galactica colonies.',
            action: true,
            actionText: 'Accept'
        },
    ];

    constructor(
        public alertService: AlertService
    ) {
    }

    showAlert(opts): void {
        this.alertService.showAlert(opts);
    }

    firstAction(opts): void {
        this.alertService.action(opts).subscribe(triggered => {
            if (triggered) {
                this.firstCount++;
            }
        });
    }

    secondAction(opts): void {
        this.alertService.action(opts).subscribe(triggered => {
            if (triggered) {
                this.secondCount++;
            }
        });
    }

    showCustomAlert(opts): void {
        opts.type = 'default';
        this.alertService.error(opts);
    }

    showSuccess(opts): void {
        this.alertService.success(opts);
    }

    showError(opts): void {
        this.alertService.error(opts);
    }

    ngOnInit(): void {
        this.page = {
            title: 'Alert component example',
            subtitle: '',
            demos: [
                {
                    title: 'Success & Error alerts',
                    description: '',
                    templateRef: this.sucErrRef,
                    values: {
                        html: `<div class="example flex-row layout-start-center">
    <button (click)="showSuccess(options[0])" sdk-flat-button>
        Success alert
    </button>
    <button (click)="showError(options[1])" sdk-flat-button>
        Error alert
    </button>
</div>`,
                        styles: `.example {
    button:not(:last-child) {
        margin-right: 8px;
    }
}
`,
                        module: `import { AlertModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add AlertModule to app imports
        AlertModule,
    ],
})
export class DemoAlertModule {
}`,
                        component: `import { Component } from '@angular/core';
import { AlertOptions, AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss']
})
export class DemoAlertsComponent {

    options: AlertOptions[] = [
        {
            title: 'Success',
            message: 'Realm of the galaxies decipherment venture take root and flourish permanence of the stars hearts of the stars.'
        },
        {
            title: 'Error',
            message: 'Cosmic ocean Apollonius of Perga rich in mystery tingling of the spine colonies dream of the mind's eye.'
        }

    constructor() {
        public alertService: AlertService
    }

    showSuccess(opts): void {
        this.alertService.success(opts);
    }

    showError(opts): void {
        this.alertService.error(opts);
    }

}`,
                    },
                },
                {
                    title: 'Alerts with additional action',
                    description: '',
                    templateRef: this.actionRef,
                    values: {
                        html: `<div class="example flex-row layout-start-center">
    <button (click)="showCustomAlert(options[8])"
            sdk-flat-button>
        Alert with action
    </button>
</div>`,
                        component: `import { Component } from '@angular/core';
import { AlertOptions, AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss']
})
export class DemoAlertsComponent {

    options: AlertOptions = {
        title: 'Bebep bop zeeep',
        message: 'Kindling the energy hidden in matter consciousness preserve and cherish that pale blue dot from which we spring encyclopaedia galactica colonies.',
        action: true,
        actionText: 'Accept'
    },

    constructor() {
        public alertService: AlertService
    }

    showCustomAlert(opts): void {
        opts.type = 'default';
        this.alertService.error(opts);
    }

}`,
                    },
                },
                {
                    title: 'Alert positions demonstration',
                    description: '',
                    templateRef: this.positionsRef,
                    values: {
                    html: `<div class="example flex-row layout-start-center">
    <button (click)="slowAlert(options[0])" sdk-flat-button>
        Alert top right
    </button>
    <button (click)="showAlert(options[1])" sdk-flat-button>
        Alert top left
    </button>
    <button (click)="showAlert(options[2])" sdk-flat-button>
        Alert top center
    </button>
    <button (click)="showAlert(options[3])" sdk-flat-button>
        Alert bottom right
    </button>
    <button (click)="showAlert(options[4])" sdk-flat-button>
        Alert bottom left
    </button>
    <button (click)="showAlert(options[5])" sdk-flat-button>
        Alert bottom center
    </button>
</div>`,
                        component: `import { Component } from '@angular/core';
import { AlertOptions, AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss']
})
export class DemoAlertsComponent {

    options: AlertOptions[] = [
        {
            title: 'Event was successful',
            message: 'Hundreds of thousands take root and flourish bits of moving fluff gathered by gravity venture how far away.',
            positionX: 'right' // by default, also available "left" | "center"
            positionY: 'top' // by default, also available "bottom"
        },

    constructor() {
        public alertService: AlertService
    }

    showAlert(opts): void {
        this.alertService.showAlert(opts);
    }

}`,
                    },
                },
            ],
            api_groups: [
                {
                    name: 'AlertService',
                    argsVisible: true,
                    apis: [
                        {
                            label: 'showAlert(options)',
                            type: 'void',
                            args: [
                                {name: 'options', type: 'AlertOptions'},
                            ],
                            description: `Create and show alert block.`,
                        },
                        {
                            label: 'success(options)',
                            type: 'void',
                            args: [
                                {name: 'options', type: 'AlertOptions'},
                            ],
                            description: `Create and show alert block with [type] as "success"`,
                        },
                        {
                            label: 'error(options)',
                            type: 'void',
                            args: [
                                {name: 'options', type: 'AlertOptions'},
                            ],
                            description: `Create and show alert block with [type] as "error"`,
                        },
                        {
                            label: 'action(options): Observable<any>',
                            type: 'void',
                            args: [
                                {name: 'options', type: 'AlertOptions'},
                            ],
                            description: `Create and show alert block with [action] as true`,
                        }
                    ],
                },
                {
                    name: 'AlertOptions',
                    apis: [
                        {
                            label: '[title]',
                            type: 'string',
                            description: ``,
                            default_value: 'Unexpected error',
                        },
                        {
                            label: '[message]',
                            type: 'string',
                            description: ``,
                            default_value: 'Something went wrong',
                        },
                        {
                            label: '[timeout]',
                            type: 'number',
                            description: `Time after which the alert will be removed`,
                            default_value: '5000',
                        },
                        {
                            label: '[type]',
                            type: 'AlertType',
                            description: `Available types: "error" | "success" | "default"`,
                            default_value: 'error',
                        },
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: ``,
                            default_value: 'false',
                        },
                        {
                            label: '[action]',
                            type: 'boolean',
                            description: `Add additional action button for alert panel`,
                            default_value: 'false',
                        },
                        {
                            label: '[actionText]',
                            type: 'string',
                            description: ``,
                            default_value: 'Done.',
                        },
                        {
                            label: '[positionX]',
                            type: 'AlertXPosition',
                            description: `Available positions: "left" | "right" | "center"`,
                            default_value: 'right',
                        },
                        {
                            label: '[positionY]',
                            type: 'AlertXPosition',
                            description: `Available positions: "top" | "bottom"`,
                            default_value: 'top.',
                        }
                    ],
                },
            ]
        };
    }

}
