import {TestBed} from '@angular/core/testing';
import {LayoutControlService} from './layout-control.service';
import {DropdownService} from '../../dropdowns/dropdown.service';
import {PLATFORM_ID} from '@angular/core';

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

        it('should #getViewport() stops immediately if platform id is not browser', () => {
            expect(service.getViewport()).toBeUndefined();
        });

        it('should #getWindowScrollTop() stops immediately if platform id is not browser', () => {
            expect(service.getWindowScrollTop()).toBeUndefined();
        });

        it('should #getWindowScrollLeft() stops immediately if platform id is not browser', () => {
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

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});

        // it('should', () => {});
    });
});
