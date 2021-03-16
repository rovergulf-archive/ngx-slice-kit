import { ElementRef, Inject, Injectable } from '@angular/core';
import { getSupportedInputTypes, Platform, supportsPassiveEventListeners, supportsScrollBehavior } from '@angular/cdk/platform';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const DEFAULT_MOBILE_LAYOUT_WIDTH = 1024;

const CHAR_STRING = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LOWER_INDEX = 1000;

@Injectable({
    providedIn: 'root'
})
export class LayoutControlService {

    public readonly supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
    public readonly supportsPassiveEventListeners = supportsPassiveEventListeners();
    public readonly supportsScrollBehavior = supportsScrollBehavior();

    /**
     * simple bool behaviorSubject which returns is mobileLayout active or not
     */
    private $mobileLayoutWidth: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_MOBILE_LAYOUT_WIDTH);
    private $focusTrap: BehaviorSubject<any[]> = new BehaviorSubject<[]>([]);

    constructor(
        @Inject(DOCUMENT) private document: any,
        public readonly platform: Platform,
    ) {
    }

    get trapped(): any {
        const elements = this.$focusTrap.getValue();
        return elements.length ? elements[0] : undefined;
    }

    get focusTrap(): any[] {
        return this.$focusTrap.getValue();
    }

    public get isMobileLayout(): boolean {
        const {width = 0} = this.getViewport();
        return width > this.mobileLayoutWidth;
    }

    public get mobileLayoutObservable(): Observable<boolean> {
        return of(this.isMobileLayout);
    }

    public get mobileLayoutDetectionEnabled(): boolean {
        return this.isMobileLayout !== null ? this.isMobileLayout : false;
    }

    public get mobileLayoutWidth(): number {
        return this.$mobileLayoutWidth.getValue();
    }

    public set mobileLayoutWidth(w: number) {
        this.$mobileLayoutWidth.next(w);
    }

    focus(elem: any) {
        this.$focusTrap.next([elem, ...this.$focusTrap.getValue()]);
    }

    public getPlatformClass(): string {
        return this.platform.IOS ? 'ios' :
            this.platform.ANDROID ? 'android' : 'browser';
    }

    public generateLayoutElementHash(): string {
        let result = '';
        for (let i = 0; i < 32; i++) {
            result += CHAR_STRING.charAt(Math.floor(Math.random() * CHAR_STRING.length));
        }
        return result;
    }

    public catch(elem: ElementRef): void {
        this.$focusTrap.next([elem, ...this.$focusTrap.getValue()]);
    }

    public getViewport(): any {
        if (!this.platform.isBrowser) {
            return;
        }

        const win = window;
        const d = this.document;
        const e = d.documentElement;
        const g = d.body;
        const w = win.innerWidth || e.clientWidth || g.clientWidth;
        const h = win.innerHeight || e.clientHeight || g.clientHeight;

        return {width: w, height: h};
    }

    public getWindowScrollTop(): number {
        if (!this.platform.isBrowser) {
            return;
        }

        const doc = this.document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    public getWindowScrollLeft(): number {
        if (!this.platform.isBrowser) {
            return;
        }

        const doc = this.document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }

}
