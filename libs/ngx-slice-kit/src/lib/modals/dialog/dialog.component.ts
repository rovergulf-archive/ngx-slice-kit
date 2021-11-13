import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
// internal
import { DialogDirective } from './dialog.directive';
import { Dialog } from './dialog.model';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

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

    @Input() public id: number;
    @Input() public data: any;
    @Input() public hideOnEscape: boolean = true;
    @Input() public hideOnBackdrop: boolean = true;
    @Input() public borderRadius: number = 0;
    @Input() public disableScroll: boolean;
    @Input() public component: any;
    @ViewChild(DialogDirective, {static: true}) public modalDirective: DialogDirective;

    @HostBinding('attr.state') public state: 'opened' | 'closed' = 'closed';

    @Output() public closed = new EventEmitter();

    public br: string = '0';
    public escapeSub: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private cfResolver: ComponentFactoryResolver,
        private router: Router
    ) {
    }

    public loadComponent(): void {
        const componentFactory = this.cfResolver.resolveComponentFactory(this.component);

        const viewRef = this.modalDirective.viewContainerRef;
        viewRef.clear();

        const componentRef = viewRef.createComponent(componentFactory);
        (componentRef.instance as Dialog).data = this.data;
        (componentRef.instance as Dialog).resultEvent.subscribe(res => {
            this.closed.next(res);
            this.closed.complete();
        });
    }

    public onSuccess(result: any): void {
        this.closed.next(result);
        this.closed.complete();
    }

    public onBackdrop(): void {
        if (this.hideOnBackdrop) {
            this.onSuccess(null);
        }
    }

    public hideOnRouterEvents(): void {
        const sub = this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            this.onBackdrop();
        });

        this.escapeSub ? this.escapeSub.add(sub) : this.escapeSub = sub;
    }

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.state = 'opened';
            if (this.borderRadius > 0) {
                this.br = `${this.borderRadius}px`;
            }

            this.loadComponent();

            this.hideOnRouterEvents();
        }
    }

    public ngOnDestroy(): void {
        this.closed.complete();
        if (this.escapeSub) {
            this.escapeSub.unsubscribe();
        }
        this.state = 'closed';
    }

}

