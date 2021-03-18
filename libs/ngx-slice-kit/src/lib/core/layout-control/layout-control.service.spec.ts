import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LayoutControlService } from './layout-control.service';
import { PLATFORM_ID } from '@angular/core';
import { getSupportedInputTypes, supportsPassiveEventListeners, supportsScrollBehavior } from '@angular/cdk/platform';

describe('LayoutControlService', () => {
    let service: LayoutControlService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LayoutControlService
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_SERVER_ID});
            service = TestBed.inject(LayoutControlService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should #getViewport() stops immediately', () => {
            expect(service.getViewport()).toBeUndefined();
        });

        it('should #getWindowScrollTop() stops immediately', () => {
            expect(service.getWindowScrollTop()).toBeUndefined();
        });

        it('should #getWindowScrollLeft() stops immediately', () => {
            expect(service.getWindowScrollLeft()).toBeUndefined();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(LayoutControlService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should #getWindowScrollTop() do not be undefined', () => {
            const doc = document.documentElement;
            expect(service.getWindowScrollTop()).toEqual((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));
        });

        it('should #getWindowScrollLeft() do not be undefined', () => {
            const doc = document.documentElement;
            expect(service.getWindowScrollLeft()).toEqual((window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0));
        });

        it('should #getViewport() return {width: number, height: number} result', () => {
            const res = service.getViewport();

            expect(res.width).toBeGreaterThan(0);
            expect(res.height).toBeGreaterThan(0);
        });

        it('should #generateLayoutElementHash length be equal 32', () => {
            const res = service.generateLayoutElementHash();

            expect(res.length).toEqual(32);
        });

        it('should #getPlatformClass() return "ios" if platform.IOS is true', () => {
            service.platform.IOS = true;
            const res = service.getPlatformClass();

            expect(res).toEqual('ios');
        });

        it('should #getPlatformClass() return "android" if platform.ANDROID is true', () => {
            service.platform.ANDROID = true;
            const res = service.getPlatformClass();

            expect(res).toEqual('android');
        });

        it('should #getPlatformClass() return "browser" if platform.IOS/ANDROID is false', () => {
            service.platform.IOS = false;
            service.platform.ANDROID = false;
            const res = service.getPlatformClass();

            expect(res).toEqual('browser');
        });


        it('should #supportedInputTypes have array of input types', () => {
            const t = Array.from(getSupportedInputTypes()).join(', ');
            expect(service.supportedInputTypes).toEqual(t);
        });

        it('should #supportsPassiveEventListeners be equal supportsPassiveEventListeners()', () => {
            const t = supportsPassiveEventListeners();
            expect(service.supportsPassiveEventListeners).toEqual(t);
        });

        it('should #supportsScrollBehavior be equal supportsScrollBehavior()', () => {
            const t = supportsScrollBehavior();
            expect(service.supportsScrollBehavior).toEqual(t);
        });

        it('should #mobileLayoutWidth be equal 1024 by default', () => {
            const defVal = 1024;
            const res = service.mobileLayoutWidth;
            expect(res).toEqual(defVal);
        });

        it('should #mobileLayoutWidth setter correctly change value', fakeAsync(() => {
            service.mobileLayoutWidth = 320;
            tick(500);
            expect(service.mobileLayoutWidth).toEqual(320);
        }));

        it('should #isMobileLayout equal true if viewport is <= 1024 and false if greater', () => {
            const res = service.isMobileLayout;
            const {width = 0} = service.getViewport();

            console.log(service.mobileLayoutWidth, width);

            expect(res).toEqual(width <= service.mobileLayoutWidth);
        });

        it('should #mobileLayoutDetectionEnabled be equal #isMobileLayout if it is not equal null', () => {
            const isMobile = service.isMobileLayout;
            const res = service.mobileLayoutDetectionEnabled;

            expect(res).toEqual(isMobile);
        });
    });
});
