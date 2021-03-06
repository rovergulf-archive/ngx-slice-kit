import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {AlertOptions} from './alert.model';
import {PLATFORM_ID} from '@angular/core';

const options: AlertOptions[] = [
    {title: 'Event was successful', message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.'},
    {title: 'Fout', message: 'Veel desktop publishing-pakketten en webpagina-editors gebruiken Lorem Ipsum nu als hun standaard.' },
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
    });


    // it('should be created', () => {
    //     const service: AlertService = TestBed.get(AlertService);
    //     expect(service).toBeTruthy();
    // });
});
