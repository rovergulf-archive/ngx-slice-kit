import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class PopupComponent implements OnInit, OnDestroy {

    @Input() id: number = 1000;
    @Input() title;
    @Input() message;
    @Input() ok = 'Ok';
    @Input() cancel = 'Cancel';
    @Output() closed = new EventEmitter();

    onSuccess(bool: boolean): void {
        this.closed.emit(bool);
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.closed.complete();
    }

}
