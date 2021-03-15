import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sdk-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

    @Input() index: number;
    @Input() label: string;
    @Input() icon: string;
    @Input() slideDirection: string = '';
    @Input() active: boolean = false;
    @Input() hiding: boolean = false;
    @Input() disabled: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
