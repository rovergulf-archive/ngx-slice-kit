import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DemoExample, DemoPageModel } from '../../model';
import { BehaviorSubject } from 'rxjs';

type demoTabs = `component` | `module` | `html` | `scss`;

@Component({
    selector: 'lib-demo-page',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

    $page: BehaviorSubject<DemoPageModel> = new BehaviorSubject<any>(undefined);

    @Input() set page(src: DemoPageModel) {
        const page = new DemoPageModel(src);
        this.$page.next(page);
    }

    get page(): DemoPageModel {
        return this.$page.getValue();
    }

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
