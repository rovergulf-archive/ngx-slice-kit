import { Component, OnInit } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';
import { OPTIONS1, OPTIONS2, OPTIONS3, OPTIONS4, OPTIONS5 } from '../../../shared/values/dropdowns.values';

@Component({
    selector: 'app-demo-autocomplete',
    templateUrl: './demo-autocomplete.component.html',
    styleUrls: ['./demo-autocomplete.component.scss', '../../docs.module.scss']
})
export class DemoAutocompleteComponent implements OnInit {

    options1: OptionModel[] = OPTIONS1;
    options2: OptionModel[] = OPTIONS2;
    options3: OptionModel[] = OPTIONS3;
    options4: OptionModel[] = OPTIONS4;
    options5: OptionModel[] = OPTIONS5;

    val1: OptionModel;
    val2: OptionModel;
    val3: OptionModel;
    val4: OptionModel;
    val5: OptionModel;

    constructor() {
    }

    onValueChange1(ev: any): void {
        this.options1 = ev?.length > 0 ? OPTIONS1.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS1;
    }

    onValueChange2(ev: any): void {
        this.options2 = ev?.length > 0 ? OPTIONS2.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS2;
    }

    onValueChange3(ev: any): void {
        this.options3 = ev?.length > 0 ? OPTIONS3.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS3;
    }

    onValueChange4(ev: any): void {
        this.options4 = ev?.length > 0 ? OPTIONS4.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS4;
    }

    onValueChange5(ev: any): void {
        this.options5 = ev?.length > 0 ? OPTIONS5.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS5;
    }

    checkSelect(target: string, val: any): void {
        if (val) {
            this[target] = val;
        }
    }

    ngOnInit(): void {
        // this.val1 = this.options1[0];
    }

}
