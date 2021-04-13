import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService, DialogService } from 'ngx-slice-kit';

import { DemoDialogPreviewComponent } from './demo-dialog-preview/demo-dialog-preview.component';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-dialog',
    templateUrl: './demo-dialog.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoDialogComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor(
        private alertService: AlertService,
        private dialogService: DialogService,
    ) {
    }

    showDialog(): void {
        this.dialogService.showDialog(DemoDialogPreviewComponent, {
            borderRadius: 8
        }).subscribe(
            res => {
                if (res) {
                    this.alertService.success({
                        message: 'Resulted with data: ' + res,
                        positionY: 'bottom',
                    });
                } else {
                    this.alertService.error({
                        title: 'No result',
                        message: 'Dialog canceled',
                        positionY: 'bottom',
                    });
                }
            }
        );
    }

    ngOnInit(): void {
        this.page = {
            title: 'Dialog service example',
            subtitle: '',
            demo_name: 'Dialog',
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        'demo-dialog.component.html': `<button (click)="showDialog()" sdk-base-button>Open example dialog</button>`,
                        'demo-dialog.module.ts': `import { DialogModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add DialogModule to app imports
        DialogModule,
    ],
})
export class DemoDialogModule {
}`,
                        'demo-dialog.component.ts': `import { Component } from '@angular/core';
import { AlertService, DialogService } from 'ngx-slice-kit';

import { DemoDialogPreviewComponent } from './demo-dialog-preview/demo-dialog-preview.component';

@Component({
    selector: 'app-demo-dialog',
    templateUrl: './demo-dialog.component.html',
    styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent {

    constructor(
        private alertService: AlertService,
        private dialogService: DialogService,
    ) {
    }

    showDialog(): void {
        this.dialogService.showDialog(DemoDialogPreviewComponent, {
            borderRadius: 8
        }).subscribe(
            res => {
                if (res) {
                    this.alertService.success({
                        message: 'Resulted with data: ' + res,
                        positionY: 'bottom',
                    });
                } else {
                    this.alertService.error({
                        title: 'No result',
                        message: 'Dialog canceled',
                        positionY: 'bottom',
                    });
                }
            }
        );
    }

}`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'DialogService',
                    apis: [
                        {
                            label: 'showDialog(component, options): Observable<any>',
                            type: 'public method',
                            args: [
                                {name: 'component', type: 'Component', required: true},
                                {name: 'options', type: 'DialogInterface'},
                            ],
                            description: `Open dialog window. 'component' should be specified and be available at your developed module`,
                        },
                        {
                            label: '[options]',
                            type: 'DialogInterface',
                            description: 'Look below for DialogInterface defaults',
                        }
                    ],
                },
                {
                    name: 'DialogInterface',
                    apis: [
                        {
                            label: '[data]',
                            type: 'any',
                            description: `provide data in any format`,
                            default_value: 'undefined',
                        },
                        {
                            label: '[hideOnBackdrop]',
                            type: 'boolean',
                            description: `hide dialog on backdrop click`,
                            default_value: true
                        },
                        {
                            label: '[hideOnEscape]',
                            type: 'boolean',
                            description: `hide dialog on Esc keyup event`,
                            default_value: true,
                        },
                        {
                            label: '[borderRadius]',
                            type: 'number',
                            description: `specify dialog content window border-radius`,
                            default_value: 0,
                        },
                        {
                            label: '[disableScroll]',
                            type: 'boolean',
                            description: `disable dialog content scroll`,
                            default_value: false,
                        },
                        {
                            label: '[styles]',
                            type: 'any',
                            description: ``,
                        },
                    ],
                },
                {
                    name: 'DialogComponent',
                    apis: [
                        {
                            label: '[data]',
                            type: 'any',
                            description: 'Provided for challenged component data',
                        },
                        {
                            label: '(resultEvent)',
                            type: 'EventEmitter',
                            description: 'Emits closed dialog event at target subscription',
                        }
                    ],
                },
            ],
        };
    }

    ngOnDestroy(): void {
    }

}
