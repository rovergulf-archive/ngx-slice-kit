import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'sdk-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({transform: 'translateY(0%)'})),
            state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
            transition('* => *', animate('300ms ease-in')),
        ])
    ]
})
export class PopupComponent implements OnDestroy {

    @Input() public id: number = 1000;
    @Input() public title;
    @Input() public message;
    @Input() public ok = 'Ok';
    @Input() public cancel = 'Cancel';
    @Output() public closed = new EventEmitter();

    public onSuccess(bool: boolean): void {
        this.closed.emit(bool);
    }

    constructor() {
    }

    public ngOnDestroy(): void {
        this.closed.complete();
    }

}
