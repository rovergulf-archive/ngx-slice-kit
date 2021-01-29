import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, DialogService } from 'ngx-slice-kit';

import { DemoDialogPreviewComponent } from './demo-dialog-preview/demo-dialog-preview.component';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent implements OnInit, OnDestroy {

  constructor(
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
  }

  openDialog(): void {
    this.dialogService.showDialog(DemoDialogPreviewComponent, {
      borderRadius: 8
    }).subscribe(
      res => {
        if (res) {
          this.alertService.success({
            message: 'Resulted with data: ' + res
          });
        } else {
          this.alertService.error({
            message: 'Dialog canceled'
          });
        }
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
