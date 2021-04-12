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
            title: 'Dialog component example',
            subtitle: '',
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
            apis: [
                {
                    label: '',
                    type: '',
                    description: '',
                }
            ],
        };
    }

    ngOnDestroy(): void {
    }

}
