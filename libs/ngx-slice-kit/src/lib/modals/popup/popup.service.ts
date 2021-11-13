import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { PopupComponent } from './popup.component';
import { PopupInterface } from './popup.interface';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    private keyupSub: Subscription;
    public opened: boolean = false;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private injector: Injector,
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    public showPopup(options: PopupInterface = {}): Observable<boolean> {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        if (this.opened) {
            throw new Error('Only one active popup instance are available');
        }

        this.opened = true;
        const popup = this.document.createElement('sdk-popup');

        const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        const popupComponentRef = factory.create(this.injector, [], popup);

        const {
            message = 'Are you sure?',
            title = 'Confirm action',
            ok = 'Ok',
            cancel = 'Cancel'
        } = options;

        popupComponentRef.instance.title = title;
        popupComponentRef.instance.message = message;
        popupComponentRef.instance.ok = ok;
        popupComponentRef.instance.cancel = cancel;

        this.keyupSub = fromEvent(this.document, 'keyup').subscribe((ev: KeyboardEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            if (ev.code === 'Escape' || ev.key === 'Escape') {
                popupComponentRef.instance.closed.emit(false);
            } else if (ev.code === 'Enter' || ev.key === 'Enter') {
                popupComponentRef.instance.closed.emit(true);
            }
        });

        this.document.body.appendChild(popup);

        this.applicationRef.attachView(popupComponentRef.hostView);

        const result = new Subject<boolean>();
        popupComponentRef.instance.closed.subscribe((res) => {
            result.next(res);
            result.complete();
            this.keyupSub.unsubscribe();
            this.document.body.removeChild(popup);
            this.applicationRef.detachView(popupComponentRef.hostView);
            this.opened = false;
        });

        return result.asObservable();
    }
}
