import { Component, OnInit } from '@angular/core';
import { AlertService, PopupService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-popup',
    templateUrl: './demo-popup.component.html',
    styleUrls: ['./demo-popup.component.scss']
})
export class DemoPopupComponent implements OnInit {

    constructor(
        private popup: PopupService,
        private alert: AlertService
    ) {
    }

    ngOnInit(): void {
    }

    openPopup(): void {
        this.popup.showPopup({
            message: `Can contain\nmultiple strings\nseparated by \\n`
        }).subscribe(ok => {
            ok ? this.alert.success({message: 'Success'}) : this.alert.error({message: 'Unsuccess'});
        });
    }
}
