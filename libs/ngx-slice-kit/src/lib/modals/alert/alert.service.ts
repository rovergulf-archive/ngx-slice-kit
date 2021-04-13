import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { AlertOptions } from './alert.model';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { LayoutControlService } from '../../core/layout-control/layout-control.service';

export const DEFAULT_ALERT_LIMIT = 25;

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    alertRefs = new Map<string, ComponentRef<AlertsComponent>>();
    layoutSub: Subscription;

    mobileLayout: boolean;
    alertIndex = 0;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private injector: Injector,
        private appRef: ApplicationRef,
        private cfResolver: ComponentFactoryResolver,
        private layoutControl: LayoutControlService
    ) {
    }

    public success(options?: AlertOptions): void {
        this.showAlert({...options, type: 'success'});
    }

    public error(options?: AlertOptions): void {
        this.showAlert({...options, type: 'error'});
    }

    public action(options?: AlertOptions): Observable<any> {
        return of(this.showAlert({...options, action: true}));
    }

    private checkoutLayout(): void {
        this.mobileLayout = this.document.body.clientWidth < this.layoutControl.mobileLayoutWidth;
        if (this.layoutSub?.closed) {
            this.layoutSub = fromEvent(window, 'resize').subscribe(res => {
                this.mobileLayout = this.document.body.clientWidth < this.layoutControl.mobileLayoutWidth;
            });
        }
    }

    public showAlert(options?: AlertOptions): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        this.checkoutLayout();

        if (this.mobileLayout) {
            options.positionX = 'center';
        }

        this.alertIndex++;
        options.index = this.alertIndex;
        options = new AlertOptions(options);

        const alertContainerRef = this.alertRefs.get(options.refName);
        if (!!alertContainerRef) {
            alertContainerRef.instance.options = options;
        } else {
            const container = this.document.createElement('sdk-alert-container');
            const factory = this.cfResolver.resolveComponentFactory(AlertsComponent);
            const containerRef = factory.create(this.injector, [], container);
            containerRef.instance.options = options;


            this.appRef.attachView((containerRef).hostView);
            this.document.body.appendChild(container);
            this.alertRefs.set(options.refName, containerRef);
            containerRef.instance.closed.subscribe(() => {
                this.alertRefs.delete(options.refName);
                this.appRef.detachView(containerRef.hostView);
                this.document.body.removeChild(container);

                if (this.alertRefs.size < 1) {
                    this.layoutSub?.unsubscribe();
                }
            });
        }
    }
}
