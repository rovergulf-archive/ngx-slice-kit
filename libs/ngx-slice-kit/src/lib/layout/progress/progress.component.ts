import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sdk-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

    val: number = 0;
    @Input() small: boolean = false;
    @Input() max: number = 100;
    @Input() min: number = 0;

    @Input() set value(val) {
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

    get value(): number {
        return this.val;
    }

    @Output() progressEnd = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

}
