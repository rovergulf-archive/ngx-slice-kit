import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DemoExample, DemoPageModel } from '../../model';

type demoTabs = `component` | `module` | `html` | `scss`;

@Component({
    selector: 'lib-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

    @Input() page: DemoPageModel;

    constructor() {
    }

    getValues?(demo: DemoExample): string[] {
        return Object.keys(demo.values);
    }

    getValueTabName?(v: string): string {
        switch (v) {
            case 'module':
                return `app.module.ts`;
            case 'component':
                return `app.component.ts`;
            case 'styles':
                return `app.component.scss`;
            case `html`:
                return `app.component.html`;
            default:
                return v;
        }
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
