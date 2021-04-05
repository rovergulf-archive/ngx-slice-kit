import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-switches',
    templateUrl: './demo-toggle.component.html',
    styleUrls: ['./demo-toggle.component.scss', '../../demo.module.scss']
})
export class DemoToggleComponent implements OnInit, OnDestroy {

    examples: any = {
        default: `<sdk-toggle></sdk-toggle>`,
        small: `<sdk-toggle [small]="true"></sdk-toggle>`,
        disabled: `<sdk-toggle [disabled]="true"></sdk-toggle>`,
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
