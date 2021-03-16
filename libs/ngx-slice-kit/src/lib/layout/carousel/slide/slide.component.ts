import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'sdk-slide',
    // templateUrl: './slide.component.html',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

    constructor(
        public el: ElementRef,
    ) {
    }

    @HostBinding('class') slide = 'sdk-slide';

    ngOnInit() {
    }

}
