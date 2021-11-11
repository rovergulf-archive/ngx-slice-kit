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

    @Input() public index: number = 0;
    @Input() public options: AlertOptions;
    @Output() public closed = new EventEmitter<any>();
    @Output() public action = new EventEmitter<any>(); // emits alert index
    @HostListener('[@state]') public state: any = 'closed';

    public sub: Subscription;
    public closeTimer: Observable<any>;
    public isPurging: boolean;

    constructor(
        private elementRef: ElementRef
    ) {
    }

    public close(action?: boolean): void {
        if (this.options.action) {
            this.options.$action?.emit(action);
            this.options.$action?.complete();
        }
        this.closed.emit(this.index);
    }

    public ngOnInit(): void {
        this.state = 'opened';

        this.closeTimer = timer(this.options.timeout);
        this.sub = this.closeTimer.subscribe(() => {
            this.closed.emit(0);
        });
    }

    public ngOnDestroy(): void {
        this.state = 'closed';
        this.sub?.unsubscribe();
        this.closeTimer = undefined;
        this.closed.complete();
    }
}

