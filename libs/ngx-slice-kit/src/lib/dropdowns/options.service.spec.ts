import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconService } from '../buttons/icon/icon.service';
import { OptionModel } from './dropdown-option.model';

describe('OptionsService', () => {
    let service: OptionsService;
    const stubOption1: OptionModel = {
        value: 1,
        label: 'test',
        disabled: false,
        selected: false
    };
    const stubOption2: OptionModel = {
        value: 2,
        label: 'second test',
        disabled: false,
        selected: false
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                IconService,
            ]
        });
        service = TestBed.inject(OptionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should options setter set correct value and getter return it', () => {
        const expectedOpts = [stubOption1, stubOption2];
        service.options = expectedOpts;
        expect(expectedOpts).toEqual(service.options, 'should options be equal after options set');
    });

    it('should optionsObservable be triggered if options was changed', () => {
        const expectedOpts = [stubOption1, stubOption2];
        service.options = expectedOpts;
        service.optionsObservable.subscribe(opts => {
            expect(opts.length).toBe(expectedOpts.length, 'should length of options arrays be equal');
            expect(opts[0]).toEqual(expectedOpts[0], 'should elements of options array be equal');
            expect(opts[1]).toEqual(expectedOpts[1], 'should elements of options array be equal');
        });
    });

    it('has', () => {
        expect(service.hasOptions).toBe(false, 'should be false if service does not have options');
        service.options = [stubOption1, stubOption2];
        expect(service.hasOptions).toBe(true, 'should be true if service has options');
    });

    it('loading', () => {
        expect(service.loading).toBe(null, 'should be null by default');
        service.loading = true;
        expect(service.loading).toBe(true, 'should be true if someone set status as true');
        service.loading = false;
        expect(service.loading).toBe(false, 'should be false if someone change status as false');
    });
});
