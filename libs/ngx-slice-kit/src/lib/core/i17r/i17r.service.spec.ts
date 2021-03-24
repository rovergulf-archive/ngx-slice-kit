import { TestBed } from '@angular/core/testing';

import { I17rService } from './i17r.service';
import {skip} from 'rxjs/operators';

describe('I17rService', () => {
    let service: I17rService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(I17rService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should #currentLang be equal "en" by default', () => {
        expect(service.currentLang).toEqual('en');
    });

    it('should #currentLang set next value for subject', () => {
        const dummy = 'pagans';
        service.currentLang$.pipe(skip(1)).subscribe(res => {
            expect(res).toEqual(dummy);
        });

        service.currentLang = dummy;
    });
});
