import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-radio',
    templateUrl: './demo-radio.component.html',
    styleUrls: ['./demo-radio.component.scss']
})
export class DemoRadioComponent implements OnInit {

    radioData = [
        {value: 1, name: 'Chiki'},
        {value: 2, name: 'Briki'}
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
