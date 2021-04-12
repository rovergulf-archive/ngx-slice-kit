import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertOptions, AlertService } from 'ngx-slice-kit';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss', '../../docs.module.scss']
})
export class DemoAlertsComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    firstCount: number = 0;
    secondCount: number = 0;
    options: AlertOptions[] = [
        { // 1
            title: 'Event was successful',
            message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.',
            positionX: 'left'
        },
        { // 2
            message: 'Veel desktop publishing-pakketten en webpagina-editors gebruiken Lorem Ipsum nu als hun standaard modeltekst, en een zoekopdracht naar \'lorem ipsum\' zal veel websites ontdekken die nog in de kinderschoenen staan.',
            title: 'Fout'
        },
        {message: 'Default one with icon', title: 'Orange star', customIcon: 'assets/icons/star_orange.svg'}, // 3
        {message: 'Demo', title: 'Title', customIcon: 'assets/icons/star_orange.svg', action: true}, // 4
        {message: '5th Game', title: 'Title', customIcon: 'assets/icons/star_orange.svg', action: true}, // 5
        {message: 'Game 6', title: 'Title', small: true}, // 6
        {message: 'Message unknown', title: 'Title 7', small: true}, // 7
        {message: 'Game 8', title: 'Title 8', small: true, positionX: 'center'}, // 8
        {
            message: 'Game 9',
            title: 'Title',
            small: true,
            positionX: 'center',
            positionY: 'bottom',
            customIcon: 'assets/icons/star_orange.svg'
        }, // 9
        {message: 'Alert number 10', title: 'Title', small: true, customIcon: 'assets/icons/star_orange.svg'}, // 10
        {message: 'Game 11', title: 'Title', small: true, positionX: 'left', positionY: 'bottom'}, // 11
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
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: '',
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

@Component({
    selector: 'app-demo-accordion',
    templateUrl: './demo-accordion.component.html',
    styleUrls: ['./demo-accordion.component.scss']
})
export class DemoAccordionComponent {

    constructor() {
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
