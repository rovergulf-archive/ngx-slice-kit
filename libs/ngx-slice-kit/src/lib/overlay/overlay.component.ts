import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { OverlayModel, OverlayOptions } from './overlay.model';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OverlayDirective } from './overlay.directive';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'sdk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy, OverlayModel {

    public sub: Subscription;
    public className: string = ``;
    public br: string = `0`;
    public rects: { top, bottom, right, left, width, height, x, y };

    @Input() public options: OverlayOptions;
    @ViewChild(OverlayDirective, {static: true}) public modalDirective: OverlayDirective;
    @ViewChild('overlay', {static: true}) public overlayElem: ElementRef;
    @HostBinding('attr.state') public state: 'opened' | 'closed' = 'closed';
    @Output() public resultEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(DOCUMENT) private document: any,
        private cfResolver: ComponentFactoryResolver,
        private router: Router,
        private renderer: Renderer2
    ) {
    }

    public loadComponent(): void {
        const componentFactory = this.cfResolver.resolveComponentFactory(this.options.component);

        const viewRef = this.modalDirective.viewContainerRef;
        viewRef.clear();

        const componentRef = viewRef.createComponent(componentFactory);
        (componentRef.instance as OverlayModel).options = this.options;
        (componentRef.instance as OverlayModel).resultEvent.subscribe(res => {
            this.onResult(res);
        });
    }

    public onResult(res?: any): void {
        this.resultEvent.next(res);
        this.resultEvent.complete();
    }

    public onBackdrop(): void {
        if (this.options.hideOnBackdrop) {
            this.onResult();
        }
    }

    /**
     * - if `fitWidth` config options is true
     * there are width declared depending on its parent element
     * - if `rects.top` calculated there is enough place to drop it down,
     *  if it hits `rects.bottom` – show it above the element
     */
    public setDropdownPosition(): void {
        if (this.rects.width) {
            this.renderer.setStyle(this.overlayElem.nativeElement, `width`, `${this.rects.width}px`);
        }

        if (this.rects.top) {
            this.renderer.setStyle(this.overlayElem.nativeElement, `top`, `${this.rects.top}px`);
        } else {
            this.renderer.setStyle(this.overlayElem.nativeElement, `bottom`, `${this.rects.bottom}px`);
        }

        this.renderer.setStyle(this.overlayElem.nativeElement, `left`, `${this.rects.left || this.options.triggerRect.left}px`);
        this.renderer.setStyle(this.overlayElem.nativeElement, `opacity`, 1);
    }

    public hideOnRouterEvents(): void {
        const sub = this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            this.onBackdrop();
        });

        this.sub ? this.sub.add(sub) : this.sub = sub;
    }


    /**
     * detect window resize and scroll to prevent failed dropdown position
     */
    public initClosingSubscriptions(): void {
        if (this.options.hideOnScroll) {
            const sub = fromEvent(window, 'scroll').pipe(
                take(1)
            ).subscribe(() => {
                this.onResult();
            });
            this.sub ? this.sub.add(sub) : this.sub = sub;
        }

        if (this.options.hideOnWindowResize) {
            const sub = fromEvent(window, 'resize').pipe(
                take(1)
            ).subscribe(() => {
                this.onResult();
            });
            this.sub ? this.sub.add(sub) : this.sub = sub;
        }
    }

    /**
     * keyboard events
     */
    public initKeydownSubscription(): void {
        this.sub.add(
            fromEvent(this.document, 'keydown').subscribe((e: KeyboardEvent) => {
                switch (e.key || e.code) {
                    case 'Escape':
                        e.preventDefault();
                        e.stopPropagation();
                        this.onResult();
                        break;
                    default:
                        return;
                }
            })
        );
    }

    public ngOnInit(): void {
        this.state = 'opened';
        if (this.options.borderRadius > 0) {
            this.br = `${this.options.borderRadius}px`;
        }

        this.loadComponent();

        this.hideOnRouterEvents();
    }

    public ngOnDestroy(): void {
        this.resultEvent?.complete();
        this.sub?.unsubscribe();
    }
}
