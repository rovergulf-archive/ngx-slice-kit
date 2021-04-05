import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { AlertService, DialogService } from 'ngx-slice-kit';
import { DemoDialogPreview2Component } from '../demo-dialog-preview2/demo-dialog-preview2.component';

@Component({
    selector: 'app-demo-dialog-preview',
    templateUrl: './demo-dialog-preview.component.html',
    styleUrls: ['./demo-dialog-preview.component.scss']
})
export class DemoDialogPreviewComponent implements OnInit, OnDestroy {

    @Output() resultEvent = new EventEmitter();

    constructor(
        private alert: AlertService,
        private dialog: DialogService,
    ) {
    }

    close(result: any): void {
        this.resultEvent.emit(result);
    }

    openDialog(): void {
        this.dialog.showDialog(DemoDialogPreview2Component).subscribe(res => {
            if (res) {
                this.alert.success({
                    message: 'Inner dialog was resulted with: ' + res
                });
            } else {
                this.alert.error({
                    message: 'You have canceled inner dialog',
                });
            }
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
