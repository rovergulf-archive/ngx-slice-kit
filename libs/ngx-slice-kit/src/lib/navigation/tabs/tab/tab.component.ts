import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sdk-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {

    @Input() public index: number;
    @Input() public label: string;
    @Input() public icon: string;
    @Input() public slideDirection: string = '';
    @Input() public active: boolean = false;
    @Input() public hiding: boolean = false;
    @Input() public disabled: boolean = false;

    constructor() {
    }
}
