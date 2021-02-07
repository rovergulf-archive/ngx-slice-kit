import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import {OPTIONS1} from '../../../../../../src/app/shared/values/dropdowns.values';
import {PLATFORM_ID} from '@angular/core';
import {OptionsService} from '../options.service';
import {DropdownService} from '../dropdown.service';
import {Observable, of} from 'rxjs';
import {DropdownOptions} from '../dropdown.model';

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

        it('should stop #showDropdown() fn if component already is opened', () => {
            component.isOpen = true;
            const showDropdownResult = component.showDropdown();

            expect(showDropdownResult).toBeUndefined('if #isOpen is true dropdown should not be open again');
        });

        it('should label be displayed if #label property is set', () => {
            const labelEl = autocompleteEl.querySelector('.sdk-autocomplete-label');
            let text = labelEl.textContent.trim();
            const textDefault = '';
            const textStub = 'Some text';
            expect(text).toBe(textDefault);

            component.label = textStub;
            fixture.detectChanges();
            text = labelEl.textContent.trim();
            expect(text).toBe(textStub);
        });

        it('should required mark be displayed if #required set as true', () => {
            component.required = true;
            fixture.detectChanges();
            const reqMark = autocompleteEl.querySelector('.sdk-autocomplete-label-required-mark');
            expect(reqMark).toBeTruthy();
        });

        it('should required mark not be displayed if #required set as false', () => {
            const reqMark = autocompleteEl.querySelector('.sdk-autocomplete-label-required-mark');
            expect(reqMark).toBeFalsy();
        });

        it('should icon be displayed if #icon set as string with icon name', () => {
            const testIconName = 'star';
            component.icon = testIconName;
            fixture.detectChanges();

            const iconEl = autocompleteEl.querySelector('.sdk-autocomplete-icon');
            expect(iconEl.classList.contains('actions')).not.toBeTruthy('it should not be actions icon');
        });

        it('should icon not be displayed if #icon does not set', () => {
            const iconEl = autocompleteEl.querySelector('.sdk-autocomplete-icon');
            expect(iconEl).toBeNull();
        });

        it('should caption element be displayed if #caption property has a value', () => {
            const caption = 'Dont listen to the radio';
            component.caption = caption;
            fixture.detectChanges();
            const captionEl = autocompleteEl.querySelector('.sdk-caption');
            expect(captionEl).toBeTruthy();
            expect(captionEl.textContent.trim()).toEqual(caption);
        });

        it('should caption element not be displayed if #caption property has no value', () => {
            const captionEl = autocompleteEl.querySelector('.sdk-caption');
            expect(captionEl).not.toBeTruthy();
        });

        it('should element has error line and error class if #error property has value', () => {
            const errorText = 'Don\'t speak upon the telephone';
            const errorClass = 'invalid';

            component.error = errorText;
            fixture.detectChanges();

            const autocompleteInnerEl = autocompleteEl.querySelector('.sdk-autocomplete');
            const errorEl = autocompleteEl.querySelector('.sdk-error');
            const errorElText = errorEl.textContent.trim();

            expect(autocompleteEl.classList.contains(errorClass)).toBeTrue();
            expect(autocompleteInnerEl.classList.contains(errorClass)).toBeTrue();
            expect(errorEl).toBeTruthy('error element should be created');
            expect(errorElText).toEqual(errorText);
        });

        it('should element has no error line and no error class if #error property has no value', () => {
            const errorClass = 'invalid';

            const autocompleteInnerEl = autocompleteEl.querySelector('.sdk-autocomplete');
            const errorEl = autocompleteEl.querySelector('.sdk-error');

            expect(autocompleteEl.classList.contains(errorClass)).not.toBeTrue();
            expect(autocompleteInnerEl.classList.contains(errorClass)).not.toBeTrue();
            expect(errorEl).not.toBeTruthy('element should not be created');
        });

        it('should host have "disabled" class', () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(autocompleteEl.classList.contains('disabled')).toBeTrue();
            expect(component.isDisabled).toBe(component.disabled);
        });

        it('should #setDisabledState() set correctly #disabled property as true or false', () => {
            component.setDisabledState(true);
            fixture.detectChanges();
            expect(autocompleteEl.classList.contains('disabled')).toBeTrue();

            component.setDisabledState(false);
            fixture.detectChanges();
            expect(autocompleteEl.classList.contains('disabled')).not.toBeTrue();
        });

        it('should #enableNullValue be false by default"', () => {
            expect(component.enableNullValue).toBeFalse();
        });

        it('should #currentValues be undefined by default', () => {
            expect(component.currentValues).toBeUndefined();
        });

        it('should placeholder set value by default', () => {
            const defaultPlaceholder = 'Find option';
            const placeholderEl = autocompleteEl.querySelector('.sdk-autocomplete-input');
            const placeholderElText = placeholderEl.placeholder.trim();
            expect(placeholderElText).toBe(defaultPlaceholder);
        });

        it('should #selected() set value in .sdk-autocomplete-input', () => {
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            const autocompleteInputEl = autocompleteEl.querySelector('.sdk-autocomplete-input');
            const autocompleteText = stubOptionA.label;

            expect(component.selected()).toBe(autocompleteText);
        });

        it('should #onResult() call #onTouched()', () => {
            spyOn(component, 'onTouched');
            component.onResult(stubOptionA);

            expect(component.onTouched).toHaveBeenCalled();
        });

        it('should #clearValue() call #writeValue() with "undefined" as argument', () => {
            spyOn(component, 'writeValue');
            component.clearValue(new MouseEvent('click'));
            expect(component.writeValue).toHaveBeenCalledWith(undefined);
        });

        it('should #clearValue() emit #valueChanges event with null as argument', () => {
            component.valueChanges.subscribe(res => {
                expect(res).toBeNull();
            });

            component.clearValue(new MouseEvent('click'));
        });

        it('should #hasValueToDrop() return true if #enableNullValue as true and #isInactive() is false', () => {
            component.enableNullValue = true;
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            expect(component.hasValuesToDrop()).toBe(true);
        });

        it('should .icon-chevron not be displayed if #hasValueToDrop() is true and .icon-clear should be', () => {
            component.enableNullValue = true;
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            const chevronEl = autocompleteEl.querySelector('.icon-chevron');
            const clearEl = autocompleteEl.querySelector('.icon-clear');
            expect(clearEl).toBeTruthy();
            expect(chevronEl).not.toBeTruthy();
        });

        it('should .icon-chevron be displayed if #hasValueToDrop() is false and .icon-clear not', () => {
            const chevronEl = autocompleteEl.querySelector('.icon-chevron');
            const clearEl = autocompleteEl.querySelector('.icon-clear');
            expect(chevronEl).toBeTruthy();
            expect(clearEl).not.toBeTruthy();
        });

        it('should #hasValueToDrop() return false #isInactive() is true', () => {
            component.currentValue = undefined;
            fixture.detectChanges();
            expect(component.hasValuesToDrop()).toBe(false);
        });

        it('should #small property add .small class to label and autocomplete-wrapper', () => {
            component.small = true;
            fixture.detectChanges();
            const wrapper = autocompleteEl.querySelector('.sdk-autocomplete');
            const label = autocompleteEl.querySelector('.sdk-autocomplete-label');

            expect(wrapper.classList.contains('small')).toBeTrue();
            expect(label.classList.contains('small')).toBeTrue();
        });

        it('should #isOpen as true add .active class for autocomplete-wrapper and icon-wrapper', () => {
            component.isOpen = true;
            component.currentValue = undefined;
            fixture.detectChanges();

            const wrapper = autocompleteEl.querySelector('.sdk-autocomplete');
            const icon = autocompleteEl.querySelector('.interface-icon-wrap');

            expect(wrapper.classList.contains('active')).toBeTrue();
            expect(icon.classList.contains('active')).toBeTrue();
        });

        /*
         *  Tests with different component.multi value;
        */

        describe('with component.multi as "true"', () => {
            beforeEach(() => {
                component.multi = true;
                component.ngOnInit();
            });

            it('should ngOnInit set #enableNullValue as "true"', () => {
                expect(component.enableNullValue).toBeTrue();
            });

            it('should #currentValues be empty after ngOnInit', () => {
                expect(component.currentValues.size).toBe(  0);
            });

            it('should #isInactive() return "true" if currentValues does not have elements', () => {
                expect(component.isInactive()).toBeTrue();
            });

            it('should #isInactive() return "false" if currentValues has elements', () => {
                component.currentValues.add(stubOptionA);
                expect(component.isInactive()).toBeFalse();
            });

            it('should #getOptions() return options with correct selected property', () => {
                component.options = OPTIONS1;
                const expectedOptionsList = [...OPTIONS1].map((el, index) => {
                    el.selected = index === testIndexA || index === testIndexB;
                    return el;
                });
                component.currentValues.add(stubOptionA);
                component.currentValues.add(stubOptionB);

                fixture.detectChanges();
                expect(component.getOptions()).toEqual(expectedOptionsList);
            });

            it('should #selected() return options labels as join in string', () => {
                const expectedSelectedString = `${stubOptionA.label}, ${stubOptionB.label}`;
                component.currentValues.add(stubOptionA);
                component.currentValues.add(stubOptionB);
                fixture.detectChanges();

                expect(component.selected()).toBe(expectedSelectedString);
            });

            it('should #onResult() call #addValue() and pass option', () => {
                spyOn(component, 'addValue');
                spyOn(component, 'writeValue');
                component.onResult(stubOptionA);

                expect(component.addValue).toHaveBeenCalledWith(stubOptionA);
                expect(component.writeValue).not.toHaveBeenCalled();
            });

            it('should #clearValue() should reset #currentValues', () => {
                component.currentValues.add(stubOptionA);
                component.currentValues.add(stubOptionB);
                fixture.detectChanges();
                expect(component.currentValues.size).toBe(2);

                component.clearValue(new MouseEvent('click'));
                fixture.detectChanges();
                expect(component.currentValues.size).toBe(0);
            });
        });

        describe('with component.multi as "false"', () => {
            beforeEach(() => {
                component.multi = false;
                component.ngOnInit();
            });

            it('should #isInactive() return "true" if currentValue does not have value', () => {
                expect(component.isInactive()).toBeTrue();
            });

            it('should #isInactive() return "false" if currentValue has value', () => {
                component.currentValue = stubOptionA;
                expect(component.isInactive()).toBeFalse();
            });

            it('should #getOptions() return options with correct selected property', () => {
                component.options = OPTIONS1;
                const expectedOptionsList = [...OPTIONS1].map((el, index) => {
                    el.selected = index === testIndexA;
                    return el;
                });
                component.currentValue = stubOptionA;

                fixture.detectChanges();
                expect(component.getOptions()).toEqual(expectedOptionsList);
            });

            it('should #selected() return #currentValue.label', () => {
                const option = stubOptionA;
                const expectedSelectedString = `${option.label}`;
                component.currentValue = option;
                fixture.detectChanges();

                expect(component.selected()).toBe(expectedSelectedString);
            });

            it('should #onResult() call #writeValue() and pass option', () => {
                spyOn(component, 'addValue');
                spyOn(component, 'writeValue');
                component.onResult(stubOptionA);

                expect(component.writeValue).toHaveBeenCalledWith(stubOptionA);
                expect(component.addValue).not.toHaveBeenCalled();
            });

            it('should #clearValue() should reset #currentValue', () => {
                component.currentValue = stubOptionA;
                fixture.detectChanges();
                expect(component.currentValue).toEqual(stubOptionA);

                component.clearValue(new MouseEvent('click'));
                fixture.detectChanges();
                expect(component.currentValue).toBeUndefined();
            });
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

    describe('Test with dropdownService', () => {
        let dropdownService;

        beforeEach(() => {
            TestBed.overrideProvider(DropdownService, {
                useValue: {
                    showDropdown: () => stubOptionA as Observable<any>
                }
            });
            fixture = TestBed.createComponent(AutocompleteComponent);
            component = fixture.componentInstance;
            dropdownService = TestBed.inject(DropdownService);
            fixture.detectChanges();

            TestBed.compileComponents();
        });

        beforeEach(() => {
            component.isOpen = false;
            component.options = OPTIONS1;
        });

        it('should #showDropdown() call #onClose() after get date', () => {
            spyOn(component, 'onClose');
            spyOn(dropdownService, 'showDropdown').and.returnValue(of(stubOptionA));

            fixture.detectChanges();
            component.showDropdown();
            expect(component.onClose).toHaveBeenCalled();
        });

        it('should #showDropdown() call #onResult() with data argument after get it', () => {
            spyOn(dropdownService, 'showDropdown').and.returnValue(of(stubOptionA));
            spyOn(component, 'onResult');

            const opts: DropdownOptions = {
                triggerRect: component.autocomplete.nativeElement.getBoundingClientRect(),
                fitWidth: true,
                hideBackdrop: true,
                multi: component.multi,
                parentElem: component.autocomplete.nativeElement,
            };

            fixture.detectChanges();
            component.showDropdown();

            expect(dropdownService.showDropdown).toHaveBeenCalledWith(opts);
            expect(component.onResult).toHaveBeenCalledWith(stubOptionA);
        });

        it('should #showDropdown() not call #onResult() if have no data', () => {
            spyOn(dropdownService, 'showDropdown').and.returnValue(of(undefined));
            spyOn(component, 'onResult');

            fixture.detectChanges();
            component.showDropdown();

            expect(component.onResult).not.toHaveBeenCalled();
        });
    });
});
