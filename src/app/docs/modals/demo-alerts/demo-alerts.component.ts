import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertOptions, AlertService } from "ngx-slice-kit";

@Component({
    selector: 'app-demo-alerts',
    templateUrl: './demo-alerts.component.html',
    styleUrls: ['./demo-alerts.component.scss', '../../docs.module.scss']
})
export class DemoAlertsComponent implements OnInit, OnDestroy {

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
        this.alertService.showAlert(opts)
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
        this.alertService.success(opts)
    }

    showError(opts): void {
        this.alertService.error(opts);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
