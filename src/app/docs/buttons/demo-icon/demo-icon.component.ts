import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-icon',
    templateUrl: './demo-icon.component.html',
    styleUrls: ['./demo-icon.component.scss']
})
export class DemoIconComponent implements OnInit, OnDestroy {

    toggle: boolean;
    size: boolean;

    constructor() {
    }

    toggleColor(): void {
        this.toggle = !this.toggle;
    }

    toggleSize(): void {
        this.size = !this.size;
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
