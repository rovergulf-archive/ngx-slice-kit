import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sdk-dots',
    templateUrl: './dots.component.html',
    styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit, OnChanges {

    @Input() count: number = 0;
    @Input() activeIndex: number = 0;
    @Input() small: boolean = false;

    @Output() selected = new EventEmitter();

    dots = [];

    constructor() {
    }

    ngOnInit() {
        this.dots = new Array(this.count);
    }

    clickHandler(index: number) {
        this.selected.emit(index);
    }

    ngOnChanges(changes): void {
        this.dots = new Array(this.count);
    }

}
