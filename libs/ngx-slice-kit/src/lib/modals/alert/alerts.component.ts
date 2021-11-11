import { Component, EventEmitter, HostBinding, HostListener, InjectionToken, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { AlertOptions } from './alert.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { takeWhile } from 'rxjs/operators';

export const ALERTS_CONTAINER_CLASSNAME = new InjectionToken<string>('sdk-alerts-container');

@Component({
    selector: 'sdk-alert-container',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({transform: 'translateY(0%)', opacity: 1})),
            state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
            transition('* => *', animate('200ms ease-in')),
        ])
    ],
})
export class AlertsComponent implements OnDestroy {

    // sub: Subscription;
    public $alerts: BehaviorSubject<AlertOptions[]> = new BehaviorSubject<AlertOptions[]>([]);

    @Input() public set options(options: AlertOptions) {
        const refs = [...this.$alerts.getValue(), new AlertOptions(options)];
        this.$alerts.next(refs);
    }

    public get options(): AlertOptions {
        const alertRefs = this.$alerts.getValue();
        return alertRefs[0];
    }

    @Output() public closed = new EventEmitter<any>();
    @HostListener('[@state]') public state: any = 'closed';

    @HostBinding('class') public get classNames(): string {
        return `${ALERTS_CONTAINER_CLASSNAME} ${ALERTS_CONTAINER_CLASSNAME}--${this.options.refName}`;
    }

    public get alerts(): AlertOptions[] {
        return this.$alerts.getValue();
    }

    public set alerts(alerts: AlertOptions[]) {
        this.$alerts.next(alerts);
    }

    constructor() {
    }

    public onClose(ev): void {
        const alerts = this.alerts;
        alerts.splice(ev, 1);
        this.alerts = alerts;
        if (this.alerts.length < 1) {
            this.closed.emit();
            this.closed.complete();
        }
    }

    public closeAll(): void {
        interval(10).pipe(
            takeWhile(() => this.alerts.length > 0, false)
        ).subscribe(
            () => this.onClose(0)
        );
    }

    public ngOnDestroy(): void {
        this.state = 'closed';
        // this.sub?.unsubscribe();
    }

}
