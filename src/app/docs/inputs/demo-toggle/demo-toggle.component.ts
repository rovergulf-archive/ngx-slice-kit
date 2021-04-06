import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemoExample } from '../../../shared/model';

@Component({
    selector: 'app-demo-switches',
    templateUrl: './demo-toggle.component.html',
    styleUrls: ['./demo-toggle.component.scss', '../../demo.module.scss']
})
export class DemoToggleComponent implements OnInit, OnDestroy {

    demos: DemoExample[] = [
        {
            title: 'Default',
            description: '',
            ts_component_val: `<sdk-toggle></sdk-toggle>`
        },
        {
            title: 'Small',
            description: '',
            ts_component_val: `<sdk-toggle [small]="true"></sdk-toggle>`
        },
        {
            title: 'Disabled',
            description: '',
            ts_component_val: `<sdk-toggle [disabled]="true"></sdk-toggle>`
        }
    ];
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
