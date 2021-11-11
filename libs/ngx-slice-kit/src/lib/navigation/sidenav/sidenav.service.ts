import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidenavOptions, SidenavState } from './sidenav.options';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    public sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public options$: BehaviorSubject<SidenavOptions> = new BehaviorSubject(new SidenavOptions({}));

    constructor() {
    }

    public get options(): SidenavOptions {
        return this.options$.getValue();
    }

    public set options(value: SidenavOptions) {
        this.options$.next(value);
    }

    public get optionsObservable(): Observable<boolean> {
        return this.sidenavOpened$.asObservable();
    }

    public get isOpened(): boolean {
        return this.sidenavOpened$.getValue();
    }

    public set isOpened(value: boolean) {
        this.sidenavOpened$.next(value);
    }

    public get openedState(): SidenavState {
        return this.isOpened ? 'opened' : 'closed';
    }

    public get openedObservableState(): Observable<boolean> {
        return this.sidenavOpened$.asObservable();
    }

    public updateOptions(o: SidenavOptions): void {
        this.options = Object.assign(this.options, o);
    }

}
