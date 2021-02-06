import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import {SelectComponent} from '../select/select.component';
import {OPTIONS1} from '../../../../../../src/app/shared/values/dropdowns.values';
import {PLATFORM_ID} from '@angular/core';
import {OptionsService} from '../options.service';
import {DropdownService} from '../dropdown.service';

describe('AutocompleteComponent', () => {
    let component: AutocompleteComponent;
    let fixture: ComponentFixture<AutocompleteComponent>;
    let autocompleteDe;
    let autocompleteEl;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const testIndexA = 0;
    const testIndexB = 2;
    const stubOptionA = OPTIONS1[testIndexA];
    const stubOptionB = OPTIONS1[testIndexB];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteComponent],
            providers: [
                // DOCUMENT,
                {provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID},
                OptionsService,
                DropdownService
            ]
        })
            .compileComponents();
    }));

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(AutocompleteComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            autocompleteDe = fixture.debugElement;
            autocompleteEl = autocompleteDe.nativeElement;
            fixture.detectChanges();

            TestBed.compileComponents();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_SERVER_ID});

            fixture = TestBed.createComponent(AutocompleteComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            TestBed.compileComponents();
        });

        it('should be created', () => {
            expect(component).toBeTruthy();
        });

        it('should #showDropdown() be stopped if PLATFORM_ID is server', () => {
            const result = component.showDropdown();

            expect(result).toBeUndefined('should be undefined if PLATFORM_ID is server');
        });
    });
});
