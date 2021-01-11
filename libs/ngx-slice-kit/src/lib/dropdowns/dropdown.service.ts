import {
    ApplicationRef,
    ComponentFactoryResolver,
    ElementRef,
    Inject,
    Injectable,
    Injector,
    PLATFORM_ID
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { DOCUMENT, isPlatformServer } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { DropdownOptions } from './dropdown.model';

@Injectable({
    providedIn: 'root'
})
export class DropdownService {

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
     * @param config
     * contains dropdown options
     */
    public showDropdown(config: DropdownOptions): Observable<any> {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        const dropdown = this.document.createElement('sdk-dropdown');

        const factory = this.cfResolver.resolveComponentFactory(DropdownComponent);
        const dropdownRef = factory.create(this.injector, [], dropdown);

        dropdownRef.instance.config = config;

        this.appRef.attachView(dropdownRef.hostView);

        this.document.body.appendChild(dropdown);

        const result = new Subject();
        dropdownRef.instance.result.subscribe((res: any) => {
            result.next(res);
            result.complete();
            this.document.body.removeChild(dropdown);
            this.appRef.detachView(dropdownRef.hostView);
        });

        return result.asObservable();
    }
}
