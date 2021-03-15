import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'sdk-dots',
    templateUrl: './dots.component.html',
    styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() count: number = 0;
    @Input() activeIndex: number = 0;
    @Input() small: boolean = false;

    @Output() selected = new EventEmitter();

    dots = [];

    constructor() {
    }

    clickHandler(index: number): void {
        this.selected.emit(index);
        this.activeIndex = index;
    }

    ngOnChanges(changes): void {
        this.dots = new Array(this.count);
    }

    ngOnInit(): void {
        this.dots = new Array(Number(this.count));
    }

    ngAfterViewInit(): void {
    }

}
