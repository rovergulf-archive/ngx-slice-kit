import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription, timer } from 'rxjs';
import { AlertOptions } from './alert.model';

/**
 * Alert component
 */
@Component({
    selector: 'sdk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({transform: 'translateY(0%)', opacity: 1})),
            state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
            transition('* => *', animate('200ms ease-in')),
        ])
    ],
})
export class AlertComponent implements OnInit, OnDestroy {

    @Input() index: number = 0;
    @Input() options: AlertOptions;
    @Output() closed = new EventEmitter<any>();
    @Output() action = new EventEmitter<any>(); // emits alert index
    @HostListener('[@state]') state: any = 'closed';

    sub: Subscription;
    closeTimer: Observable<any>;
    isPurging: boolean;

    constructor(
        private elementRef: ElementRef
    ) {
    }

    close(action?: boolean): void {
        if (this.options.action) {
            this.options.$action?.emit(action);
            this.options.$action?.complete();
        }
        this.closed.emit(this.index);
    }

    ngOnInit(): void {
        this.state = 'opened';

        this.closeTimer = timer(this.options.timeout);
        this.sub = this.closeTimer.subscribe(() => {
            this.closed.emit(0);
        });
    }

    ngOnDestroy(): void {
        this.state = 'closed';
        this.sub?.unsubscribe();
        this.closeTimer = undefined;
        this.closed.complete();
    }
}

