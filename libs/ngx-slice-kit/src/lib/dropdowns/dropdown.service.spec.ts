import { TestBed } from '@angular/core/testing';

import { DropdownService } from './dropdown.service';
import { DropdownOptions } from './dropdown.model';
import { PLATFORM_ID } from '@angular/core';

describe('DropdownService', () => {
    let service: DropdownService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const opts = new DropdownOptions();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DropdownService,
                {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            service = TestBed.inject(DropdownService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should not render dropdown component if PLATFORM_ID is server', () => {
            expect(service.showDropdown(opts)).toBeUndefined();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(DropdownService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should render dropdown component if PLATFORM_ID is browser', () => {
            service.showDropdown(opts);
            const dropdownEl = document.querySelector('sdk-dropdown');
            expect(dropdownEl).toBeTruthy('if platform is browser then service must render the dropdown element');
            dropdownEl.remove();
        });
    });
});


