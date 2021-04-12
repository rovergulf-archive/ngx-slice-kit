import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';

import { DialogInterface } from './dialog.interface';
import { DOCUMENT, isPlatformServer } from '@angular/common';

const LOWER_INDEX = 100;

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private currentId = LOWER_INDEX;
    private refs = [];
    public escapeSub: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private injector: Injector,
        private appRef: ApplicationRef,
        private cfResolver: ComponentFactoryResolver
    ) {
    }

    /**
     * showDialog runs dialog with specified component
     * @param component
     * specify component to render, required
     * @param options
     * dialog-options.interface, optional
     */
    public showDialog(component, options: DialogInterface = {}): Observable<any> {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        const {
            data,
            hideOnBackdrop = true,
            hideOnEscape = true,
            borderRadius = 0,
            disableScroll
        } = options;
        const dialog = this.document.createElement('sdk-dialog');

        const factory = this.cfResolver.resolveComponentFactory(DialogComponent);
        const dialogRef = factory.create(this.injector, [], dialog);

        this.currentId++;

        dialogRef.instance.component = component;
        dialogRef.instance.data = data;
        dialogRef.instance.hideOnBackdrop = hideOnBackdrop;
        dialogRef.instance.hideOnEscape = hideOnEscape;
        dialogRef.instance.borderRadius = borderRadius;
        dialogRef.instance.disableScroll = disableScroll;
        dialogRef.instance.id = this.currentId;
        this.refs.push(dialogRef);

        if (hideOnEscape) {
            this.escapeListener();
        }

        this.appRef.attachView(dialogRef.hostView);

        this.document.body.appendChild(dialog);

        const result = new Subject();
        dialogRef.instance.closed.subscribe((res: any) => {
            result.next(res);
            result.complete();
            this.refs.pop();
            if (this.refs.length === 0) {
                if (this.escapeSub) {
                    this.escapeSub.unsubscribe();
                }
            }
            this.currentId--;
            this.document.body.removeChild(dialog);
            this.appRef.detachView(dialogRef.hostView);
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
                this.onEscape();
            }
        });
    }

    onEscape(): void {
        if (this.refs && this.refs.length) {
            const dialog = this.refs[this.refs.length - 1];
            if (dialog.instance?.hideOnEscape) {
                dialog.instance?.closed.emit(null);
            }
        }
    }
}
