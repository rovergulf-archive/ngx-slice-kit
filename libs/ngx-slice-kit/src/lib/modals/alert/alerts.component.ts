import {
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { BehaviorSubject, interval } from "rxjs";
import { AlertOptions } from "./alert.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { takeWhile } from "rxjs/operators";

export const ALERTS_CONTAINER_CLASSNAME = new InjectionToken<string>('sdk-alerts-container')

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
export class AlertsComponent implements OnInit, OnDestroy {

    // sub: Subscription;
    $alerts: BehaviorSubject<AlertOptions[]> = new BehaviorSubject<AlertOptions[]>([]);

    @Input() set options(options: AlertOptions) {
        const refs = [...this.$alerts.getValue(), options];
        this.$alerts.next(refs);
    };

    @Output() closed = new EventEmitter<any>();
    @HostListener('[@state]') state: any = 'closed';

    @HostBinding('class') get classNames() {
        return `${ALERTS_CONTAINER_CLASSNAME} ${ALERTS_CONTAINER_CLASSNAME}--${this.options.refName}`
    }

    get options(): AlertOptions {
        const alertRefs = this.$alerts.getValue();
        return alertRefs[0];
    }

    get alerts(): AlertOptions[] {
        return this.$alerts.getValue();
    };

    set alerts(alerts: AlertOptions[]) {
        this.$alerts.next(alerts);
    }

    constructor() {
    }

    onClose(ev): void {
        const alerts = this.alerts;
        alerts.splice(ev, 1);
        this.alerts = alerts;
        if (this.alerts.length < 1) {
            this.closed.emit();
            this.closed.complete();
        }
    }

    closeAll() {
        interval(10).pipe(
            takeWhile(() => this.alerts.length > 0, false)
        ).subscribe(
            () => this.onClose(0)
        );
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.state = 'closed';
        // this.sub?.unsubscribe();
    }

}
