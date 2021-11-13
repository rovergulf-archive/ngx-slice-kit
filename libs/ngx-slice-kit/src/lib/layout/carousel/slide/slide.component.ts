import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
    selector: 'sdk-slide',
    // templateUrl: './slide.component.html',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent {

    constructor(
        public el: ElementRef,
    ) {
    }

    @HostBinding('class')
    public slide = 'sdk-slide';
}
