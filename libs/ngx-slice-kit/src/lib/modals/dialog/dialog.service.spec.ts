import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {PopupService} from '../popup/popup.service';
import {Component, PLATFORM_ID} from '@angular/core';

describe('DialogService', () => {
    let service: DialogService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    // const stubOpts: PopupInterface = {message: `Can contain\nmultiple strings\nseparated by \\n`};

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            providers: [
                DialogService,
                {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            service = TestBed.inject(DialogService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should not render dialog component if PLATFORM_ID is server', () => {
            expect(service.showDialog(TestComponent)).toBeUndefined();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(DialogService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });
});

@Component({
    template: `
        <div>
            <p>some text</p>
        </div>
    `
})
class TestComponent {
}
