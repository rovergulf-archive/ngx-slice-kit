import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-progress',
    templateUrl: './demo-progress.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoProgressComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    value: number = 0;
    value2: number = 0;

    constructor() {
    }

    ngOnInit(): void {
    }

    valueChange(n: number): void {
        if (this.value + n < 0) {
            return;
        }
        this.value += n;
    }

    smallValueChange(n: number): void {
        if (this.value2 + n < 0) {
            return;
        }
        this.value2 += n;
    }
}
