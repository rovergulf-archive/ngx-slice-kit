import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayOptions } from './overlay.model';

const LOWER_INDEX = 100;

@Injectable({
    providedIn: 'root'
})
export class OverlayService {

    private currentId = LOWER_INDEX;
    private refs: any = [];
    public escapeSub: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private injector: Injector,
        private appRef: ApplicationRef,
        private cfResolver: ComponentFactoryResolver,
    ) {
    }

    /**
     * showOverlay runs overlay with specified component
     * @param options
     * overlay.model, optional
     */
    public createOverlay(options: OverlayOptions = {}): Observable<any> {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        const overlay = this.document.createElement('sdk-overlay');

        const factory = this.cfResolver.resolveComponentFactory(OverlayComponent);
        const overlayRef = factory.create(this.injector, [], overlay);

        this.currentId++;

        options.index = this.currentId;
        overlayRef.instance.options = options;
        this.refs.push(overlayRef);

        if (options.hideOnEscape) {
            this.escapeListener();
        }

        this.appRef.attachView(overlayRef.hostView);

        this.document.body.appendChild(overlay);

        const result = new Subject();
        overlayRef.instance.result.subscribe((res: any) => {
            result.next(res);
            result.complete();
            this.refs.pop();
            if (this.refs.length === 0) {
                if (this.escapeSub) {
                    this.escapeSub.unsubscribe();
                }
            }
            this.currentId--;
            this.document.body.removeChild(overlay);
            this.appRef.detachView(overlayRef.hostView);
        });

        return result.asObservable();
    }

    escapeListener(): void {
        if (this.escapeSub && !this.escapeSub.closed) {
            return;
        }

        this.escapeSub = fromEvent(document, 'keyup').subscribe((ev: KeyboardEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            if (ev.code === 'Escape' || ev.key === 'Escape') {
                this.onResultKey(null);
            } else if (ev.code === 'Enter' || ev.key === 'Enter') {
                // this.onResultKey(true);
            } else if (ev.code === 'Space' || ev.key === 'Space') {
                // this.onResultKey();
            }
        });
    }

    onResultKey(emitValue?: any): void {
        if (this.refs && this.refs.length) {
            const dialog = this.refs[this.refs.length - 1];
            if (dialog.instance.hideOnEscape) {
                dialog.instance.closed.emit(emitValue);
            }
        }
    }
}
