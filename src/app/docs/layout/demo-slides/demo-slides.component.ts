import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-slides',
    templateUrl: './demo-slides.component.html',
    styleUrls: ['../../demo.module.scss']
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

    setFirstValue(e): void {
        this.firstValue = e;
    }

    setSecValue(e): void {
        this.secValue = e;
    }

    setThirdValue(e): void {
        this.thirValue = e;
    }

    setFourthValue(e): void {
        this.fourthValue = e;
    }

}
