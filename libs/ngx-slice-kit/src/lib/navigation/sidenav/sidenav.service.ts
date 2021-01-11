import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidenavOptions, SidenavState } from './sidenav.options';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    options$: BehaviorSubject<SidenavOptions> = new BehaviorSubject(new SidenavOptions({}));

    constructor() {
    }

    get options(): SidenavOptions {
        return this.options$.getValue();
    }

    set options(value: SidenavOptions) {
        this.options$.next(value);
    }

    get optionsObservable(): Observable<boolean> {
        return this.sidenavOpened$.asObservable();
    }

    get isOpened(): boolean {
        return this.sidenavOpened$.getValue();
    }

    get openedState(): SidenavState {
        return this.isOpened ? 'opened' : 'closed';
    }

    set isOpened(value: boolean) {
        this.sidenavOpened$.next(value);
    }

    get openedObservableState(): Observable<boolean> {
        return this.sidenavOpened$.asObservable();
    }

    updateOptions(o: SidenavOptions): void {
        this.options = Object.assign(this.options, o);
    }

}
