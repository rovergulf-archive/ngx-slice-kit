import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemoPageModel } from '../../model';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
