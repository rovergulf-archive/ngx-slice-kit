import {TestBed} from '@angular/core/testing';

import {DialogService} from './dialog.service';
import {Component, PLATFORM_ID} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogInterface} from './dialog.interface';
import {Subscription} from 'rxjs';

describe('DialogService', () => {
    let service: DialogService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const stubOpts: DialogInterface = {hideOnEscape: false};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                TestComponent,
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

        it('should render dialog component if PLATFORM_ID is browser', () => {
            service.showDialog(TestComponent);
            const dropdownEl = document.querySelector('sdk-dialog');
            expect(dropdownEl).toBeTruthy('if platform is browser then service must render the dialog element');
            dropdownEl.remove();
        });

        it('should be called #escapeListener method if #options.hideOnEscape is true', () => {
            spyOn(service, 'escapeListener');
            service.showDialog(TestComponent);

            expect(service.escapeListener).toHaveBeenCalled();
        });

        it('should not be called #escapeListener method if #options.hideOnEscape is false', () => {
            spyOn(service, 'escapeListener');
            service.showDialog(TestComponent, stubOpts);

            expect(service.escapeListener).not.toHaveBeenCalled();
        });

        it('should #onEscape method be called if service has subscription and "keyup" happen with "Escape" code', () => {
            spyOn(service, 'onEscape');
            service.escapeListener();
            document.dispatchEvent(new KeyboardEvent('keyup', {code: 'Escape'}));
            expect(service.onEscape).toHaveBeenCalled();
        });

        it('should service subscribe on "keyup" event if #escapeSub is undefined', () => {
            service.escapeListener();

            expect(service.escapeSub).toBeTruthy();
        });

        it('should service do not subscribe on "keyup" event if #escapeSub has not closed subscription', () => {
            service.escapeSub = new Subscription();
            spyOn(service, 'onEscape');
            service.escapeListener();

            expect(service.onEscape).not.toHaveBeenCalled();
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
