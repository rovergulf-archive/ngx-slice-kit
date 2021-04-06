import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiDefinition, DemoExample } from '../../../shared/model';

@Component({
    selector: 'app-demo-switches',
    templateUrl: './demo-toggle.component.html',
    styleUrls: ['./demo-toggle.component.scss', '../../demo.module.scss']
})
export class DemoToggleComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('smallRef', {static: true}) smallRef: any;
    @ViewChild('disabledRef', {static: true}) disabledRef: any;

    demos: DemoExample[] = [];

    apis: ApiDefinition[] = [
        {
            label: 'isActive',
            type: 'boolean',
            description: '',
            required: false,
        },
        {
            label: 'required',
            type: 'boolean',
            description: '',
            required: false,
        },
        {
            label: 'disabled',
            type: 'boolean',
            description: '',
            required: false,
        },
    ];

    constructor() {
    }

    ngOnInit(): void {
        this.demos = [
            {
                title: 'Default',
                description: '',
                templateRef: this.defaultRef,
                ts_component_val: `<sdk-toggle></sdk-toggle>`
            },
            {
                title: 'Small',
                description: '',
                templateRef: this.smallRef,
                ts_component_val: `<sdk-toggle [small]="true"></sdk-toggle>`
            },
            {
                title: 'Disabled',
                description: '',
                templateRef: this.disabledRef,
                ts_component_val: `<sdk-toggle [disabled]="true"></sdk-toggle>`
            }
        ];
    }

    ngOnDestroy(): void {
    }

}
