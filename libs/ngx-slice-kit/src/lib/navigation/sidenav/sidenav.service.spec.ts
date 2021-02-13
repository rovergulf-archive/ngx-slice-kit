import {TestBed} from '@angular/core/testing';

import {SidenavService} from './sidenav.service';
import {SidenavMode, SidenavOptions} from './sidenav.options';
import {skip} from 'rxjs/operators';

describe('SidenavService', () => {
    let service: SidenavService;
    const mode: SidenavMode = 'over';
    const stubOptions = new SidenavOptions({mode, width: 64, opened: false});
    const defaultOptions = new SidenavOptions({});

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SidenavService],
        });
        service = TestBed.inject(SidenavService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should options has default value after service creation', () => {
        service.options$.subscribe(res => {
            expect(res).toEqual(defaultOptions);
            expect(service.options).toEqual(defaultOptions);
        });
    });

    it('should options correctly change', () => {
        service.options$.pipe(skip(1)).subscribe(res => {
            expect(res).toEqual(stubOptions);
            expect(service.options).toEqual(stubOptions);
        });

        service.options = stubOptions;
    });

    it('should #updateOptions() correctly update #options prop', () => {
        service.updateOptions(stubOptions);

        expect(service.options).toEqual(stubOptions);
    });

    it('should #openedState return opened string if #isOpened is true', () => {
        service.isOpened = true;
        expect(service.openedState).toEqual('opened');
    });

    it('should #openedState return closed string if #isOpened is false', () => {
        service.isOpened = false;
        expect(service.openedState).toEqual('closed');
    });

    it('should #isOpened be true by default', () => {
        expect(service.isOpened).toBeTrue();
    });

    it('should #isOpened correctly change value', () => {
        let counter = 0;
        service.optionsObservable.subscribe(() => {
            switch (counter) {
                case 0:
                    expect(service.isOpened).toBeTrue(); // by default
                    break;
                case 1:
                    expect(service.isOpened).toBeFalse();
                    break;
                case 2:
                    expect(service.isOpened).toBeTrue();
                    break;
            }
            ++counter;
        });
        service.isOpened = false;
        service.isOpened = true;
    });
});
