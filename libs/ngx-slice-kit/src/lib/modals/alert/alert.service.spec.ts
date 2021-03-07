import {TestBed} from '@angular/core/testing';

import {AlertService} from './alert.service';
import {AlertOptions} from './alert.model';
import {PLATFORM_ID} from '@angular/core';
import {of} from 'rxjs';

const options: AlertOptions[] = [
    {title: 'Event was successful', message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.'},
    {title: 'Fout', message: 'Veel desktop publishing-pakketten en webpagina-editors gebruiken Lorem Ipsum nu als hun standaard.'},
];

describe('AlertService', () => {
    let service: AlertService;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const opts: AlertOptions = options[0];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertService,
                {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            service = TestBed.inject(AlertService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should not render dropdown component if PLATFORM_ID is server', () => {
            expect(service.showAlert(opts)).toBeUndefined();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(AlertService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should #error method call #showAlert with option and type = "error"', () => {
            spyOn(service, 'showAlert');
            service.error(opts);

            expect(service.showAlert).toHaveBeenCalledWith({...opts, type: 'error'});
        });

        it('should #success method call #showAlert with option and type = "success"', () => {
            spyOn(service, 'showAlert');
            service.success(opts);

            expect(service.showAlert).toHaveBeenCalledWith({...opts, type: 'success'});
        });

        it('should #showAlert call #checkoutLayout method', () => {
            spyOn(service, 'checkoutLayout');
            service.showAlert(opts);

            expect(service.checkoutLayout).toHaveBeenCalled();
        });

        it('should #showALert increase #alertIndex', () => {
            service.alertIndex = 0;
            service.showAlert(opts);
            expect(service.alertIndex).toEqual(1);
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
