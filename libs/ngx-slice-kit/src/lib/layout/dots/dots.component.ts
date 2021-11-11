import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sdk-dots',
    templateUrl: './dots.component.html',
    styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit, OnChanges {

    @Input() public count: number = 0;
    @Input() public activeIndex: number = 0;
    @Input() public small: boolean = false;

    @Output() public selected = new EventEmitter();

    public dots = [];

    constructor() {
    }

    public clickHandler(index: number): void {
        this.selected.emit(index);
        this.activeIndex = index;
    }

    public ngOnChanges(changes): void {
        this.dots = new Array(this.count);
    }

    public ngOnInit(): void {
        this.dots = new Array(Number(this.count));
    }
}
