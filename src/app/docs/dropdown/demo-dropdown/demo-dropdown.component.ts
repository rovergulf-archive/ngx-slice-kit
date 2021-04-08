import { Component, OnInit } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';
import { OPTIONS1, OPTIONS2, OPTIONS3 } from '../../../shared/values/dropdowns.values';

@Component({
    selector: 'app-demo-dropdown',
    templateUrl: './demo-dropdown.component.html',
    styleUrls: ['./demo-dropdown.component.scss', '../../docs.module.scss']
})
export class DemoDropdownComponent implements OnInit {

    result1: any = '';
    result2: any = '';
    result3: any = '';

    options1: OptionModel[] = OPTIONS1;

    options2: OptionModel[] = OPTIONS2;

    options3: OptionModel[] = OPTIONS3;

    constructor() {
    }

    firstResult(ev: any): void {
        // console.log('first: ', ev);
        this.result1 = ev.label;
    }

    secondResult(ev: any): void {
        // console.log('second: ', ev);
        this.result2 = ev.label;
    }

    thirdResult(ev: any): void {
        // console.log('third: ', ev);
        this.result3 = ev.label;
    }

    ngOnInit(): void {
    }

}
