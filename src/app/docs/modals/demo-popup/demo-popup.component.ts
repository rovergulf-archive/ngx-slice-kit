import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService, PopupService } from 'ngx-slice-kit';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-popup',
    templateUrl: './demo-popup.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoPopupComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor(
        private popup: PopupService,
        private alert: AlertService,
    ) {
    }

    showPopup(): void {
        this.popup.showPopup({
            message: `Can contain\nmultiple strings\nseparated by \\n`
        }).subscribe(ok => {
            ok ? this.alert.success({message: 'Success'}) : this.alert.error({message: 'Unsuccess'});
        });
    }

    ngOnInit(): void {
        this.page = {
            title: 'Popup service example',
            subtitle: '',
            demo_name: 'Popup',
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<button (click)="showPopup()" sdk-raised-button>Open example popup</button>`,
                        module: `import { PopupModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add PopupModule to app imports
        PopupModule,
    ],
})
export class DemoPopupModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-popup',
    templateUrl: './demo-popup.component.html',
    styleUrls: ['./demo-popup.component.scss']
})
export class DemoPopupComponent {

    constructor(
        private popup: PopupService,
        private alert: AlertService,
    ) {
    }

    showPopup(): void {
        this.popup.showPopup({
            message: \`Can contain\\nmultiple strings\\nseparated by \\\\n\`
        }).subscribe(ok => {
            ok ? this.alert.success({message: 'Success'}) : this.alert.error({message: 'Unsuccess'});
        });
    }

}`,
                    },
                }
            ],
            api_groups: [
                {
                    name: '',
                    apis: [
                        {
                            label: '',
                            type: '',
                            description: '',
                        }
                    ],
                }
            ]
        };
    }

}
