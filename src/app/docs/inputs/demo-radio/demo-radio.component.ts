import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-radio',
    templateUrl: './demo-radio.component.html',
    styleUrls: ['./demo-radio.component.scss', '../../demo.module.scss']
})
export class DemoRadioComponent implements OnInit, OnDestroy {

    radioData = [
        {value: 1, name: 'Chiki'},
        {value: 2, name: 'Briki'}
    ];


    examples: any = {
        default: [
            `<sdk-radio [data]="radioData" [required]="true"></sdk-radio>`,
            `<sdk-radio [data]="radioData" [small]="true"></sdk-radio>`
        ],
        header: [
            `<sdk-radio [data]="radioData" label="Radio"></sdk-radio>`,
            `<sdk-radio [data]="radioData" [small]="true" label="Radio"></sdk-radio>`
        ],
        error: [
            `<sdk-radio [data]="radioData" error="Error radio"></sdk-radio>`,
            `<sdk-radio [data]="radioData" [small]="true" error="Error radio"></sdk-radio>`
        ],
        disabled: [
            `<sdk-radio [data]="radioData" [disabled]="true"></sdk-radio>`,
            `<sdk-radio [data]="radioData" [disabled]="true" [small]="true"></sdk-radio>`
        ],
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
