import { Component, OnInit } from '@angular/core';
import { OptionModel } from "ngx-slice-kit";
import {
    OPTIONS1,
    OPTIONS2,
    OPTIONS3,
    OPTIONS4,
    OPTIONS5,
    OPTIONS6,
    OPTIONS7
} from "../../../shared/values/dropdowns.values";

@Component({
    selector: 'app-demo-select',
    templateUrl: './demo-select.component.html',
    styleUrls: ['./demo-select.component.scss', '../../docs.module.scss']
})
export class DemoSelectComponent implements OnInit {

    options1: OptionModel[];
    options2: OptionModel[];
    options3: OptionModel[];
    options4: OptionModel[];
    options5: OptionModel[];
    options6: OptionModel[];
    options7: OptionModel[];

    multiValues1;
    multiValues2;
    singleVal1;
    singleVal2;
    singleVal3;
    singleVal4;
    singleVal5;
    singleVal6;

    constructor() {
    }

    onFirstValueChange(ev): void {
        // console.log('value changed', ev);
    }

    checkSelect(e): void {
        // console.log('selected values: ', e);
    }

    ngOnInit(): void {
        this.options1 = OPTIONS1;
        this.options2 = OPTIONS2;
        this.options3 = OPTIONS4;
        this.options4 = OPTIONS3;
        this.options5 = OPTIONS5;
        this.options6 = OPTIONS6;
        this.options7 = OPTIONS7;

        this.multiValues1 = new Set([this.options3[1], this.options3[3]]);
        this.singleVal1 = this.options1[1];
        this.singleVal3 = this.options4[3];
    }

}
