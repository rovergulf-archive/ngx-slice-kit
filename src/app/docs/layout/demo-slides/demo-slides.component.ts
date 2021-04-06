import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-slides',
    templateUrl: './demo-slides.component.html',
    styleUrls: ['./demo-slides.component.scss']
})
export class DemoSlidesComponent implements OnInit {

    firstValue: number = 20;
    secValue: number = 60;
    thirValue: number = 3;
    fourthValue: { min: number, max: number } = {min: 0, max: 20};

    constructor() {
    }

    ngOnInit(): void {
    }

    setFirstValue(e) {
        this.firstValue = e;
    }

    setSecValue(e) {
        this.secValue = e;
    }

    setThirdValue(e) {
        this.thirValue = e;
    }

    setFourthValue(e) {
        this.fourthValue = e;
    }

}
