import {TestBed} from '@angular/core/testing';
import {PopupService} from './popup.service';
import {PLATFORM_ID} from '@angular/core';
import {PopupInterface} from './popup.interface';
import {DropdownService} from '../../dropdowns/dropdown.service';


describe('PopupService', () => {
    let service: PopupService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const stubOpts: PopupInterface = {message: `Can contain\nmultiple strings\nseparated by \\n`};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PopupService,
                {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            service = TestBed.inject(PopupService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should not render popup component if PLATFORM_ID is server', () => {
            expect(service.showPopup(stubOpts)).toBeUndefined();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(PopupService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should render popup component if PLATFORM_ID is browser', () => {
            service.showPopup(stubOpts);
            const dropdownEl = document.querySelector('sdk-popup');
            expect(dropdownEl).toBeTruthy('if platform is browser then service must render the dropdown element');
            dropdownEl.remove();
        });

        it('should #showPopup throw error if popup is already opened', () => {
            service.opened = true;
            expect(() => service.showPopup(stubOpts)).toThrow(new Error('Only one active popup instance are available'));
        });

        it('should #opened be true after #showPopup', () => {
            service.showPopup(stubOpts);

            expect(service.opened).toBeTrue();
        });
    });
});
