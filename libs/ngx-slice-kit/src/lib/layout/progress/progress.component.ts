import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sdk-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

    public val: number = 0;
    @Input() public small: boolean = false;
    @Input() public max: number = 100;
    @Input() public min: number = 0;

    @Input() public set value(val) {
        if (val > this.max) {
            this.val = 100;
        } else if (val < this.min) {
            this.val = 0;
        } else {
            this.val = Math.round(100 / (this.max / val));
        }

        if (this.val === 100) {
            setTimeout(() => {
                this.progressEnd.emit();
            }, 400);
        }
    }

    public get value(): number {
        return this.val;
    }

    @Output() public progressEnd = new EventEmitter();

    constructor() {
    }
}
