import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
// internal
import { DialogDirective } from './dialog.directive';
import { Dialog } from './dialog.model';
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
    selector: 'sdk-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({transform: 'translateY(0%)'})),
            state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
            transition('* => *', animate('300ms ease-in')),
        ])
    ]
})
export class DialogComponent implements OnInit, OnDestroy {

    @Input() id: number;
    @Input() data: any;
    @Input() hideOnEscape: boolean = true;
    @Input() hideOnBackdrop: boolean = true;
    @Input() borderRadius: number = 0;
    @Input() disableScroll: boolean;
    @Input() component: any;
    @ViewChild(DialogDirective, {static: true}) modalDirective: DialogDirective;

    @HostBinding('attr.state') state: 'opened' | 'closed' = 'closed';

    @Output() closed = new EventEmitter();

    br: string = '0';
    escapeSub: Subscription;

    constructor(
        private cfResolver: ComponentFactoryResolver,
        private router: Router
    ) {
    }

    loadComponent(): void {
        const componentFactory = this.cfResolver.resolveComponentFactory(this.component);

        const viewRef = this.modalDirective.viewContainerRef;
        viewRef.clear();

        const componentRef = viewRef.createComponent(componentFactory);
        (componentRef.instance as Dialog).data = this.data;
        (componentRef.instance as Dialog).result.subscribe(res => {
            this.closed.next(res);
            this.closed.complete();
        });
    }

    onSuccess(result: any): void {
        // console.log('Complete dialog with result: ', result);
        this.closed.next(result);
        this.closed.complete();
    }

    onBackdrop(): void {
        if (this.hideOnBackdrop) {
            this.onSuccess(null);
        }
    }

    hideOnRouterEvents(): void {
        const sub = this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            this.onBackdrop();
        });

        this.escapeSub ? this.escapeSub.add(sub) : this.escapeSub = sub;
    }

    ngOnInit(): void {
        this.state = 'opened';
        if (this.borderRadius > 0) {
            this.br = `${this.borderRadius}px`;
        }

        this.loadComponent();

        this.hideOnRouterEvents();
    }

    ngOnDestroy(): void {
        this.closed.complete();
        if (this.escapeSub) {
            console.log('esc sub is on');
            // this.escapeSub.unsubscribe();
        }
        this.state = 'closed';
    }

}

