import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import {PLATFORM_ID} from '@angular/core';
import {OptionsService} from '../options.service';
import {DropdownService} from '../dropdown.service';
import {Observable, of} from 'rxjs';
import {DropdownOptions} from '../dropdown.model';
import {skip} from 'rxjs/operators';
import {IconComponent} from '../../buttons/icon/icon.component';
import {OptionModel} from '../dropdown-option.model';

const options: OptionModel[] = [
    {value: 1, label: 'Red Dead Redemption 2'},
    {value: 2, label: 'Death Stranding'},
    {value: 3, label: 'Bloodborne'},
    {value: 4, label: 'Witcher 3'},
    {value: 5, label: 'Cyberpunk 2077'},
    {value: 6, label: 'Assassins Creed: Valhalla'},
    {value: 7, label: 'Mortal Kombat 11'}
];

describe('AutocompleteComponent', () => {
    let component: AutocompleteComponent;
    let fixture: ComponentFixture<AutocompleteComponent>;
    let autocompleteDe;
    let autocompleteEl;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const testIndexA = 0;
    const testIndexB = 2;
    const stubOptionA = options[testIndexA];
    const stubOptionB = options[testIndexB];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AutocompleteComponent,
                IconComponent
            ],
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

        it('should #currentValues be undefined by default', () => {
            expect(component.currentValues).toBeUndefined();
        });

        it('should placeholder set value as empty string by default', () => {
            const defaultPlaceholder = '';
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

        it('should #addValue() add value to #currentValues if they are not already selected', () => {
            component.options = options;
            component.currentValues = new Set();
            fixture.detectChanges();
            expect(component.currentValues.has(stubOptionA)).toBeFalse();

            component.addValue(stubOptionA);
            fixture.detectChanges();
            expect(component.currentValues.has(stubOptionA)).toBeTrue();
        });

        it('should #addValue() delete value from #currentValues if they are already selected', () => {
            component.options = options;
            component.currentValues = new Set();
            component.addValue(stubOptionA);
            fixture.detectChanges();
            expect(component.currentValues.has(stubOptionA)).toBeTrue();

            component.addValue(stubOptionA);
            fixture.detectChanges();
            expect(component.currentValues.has(stubOptionA)).toBeFalse();
        });

        it('should #emitBlur() emit blur event if #focused is true', () => {
            let expectedResult = '';
            component.focused = true;
            component.blurEvent.subscribe(() => {
                expectedResult = 'some result';

                expect(expectedResult).toEqual(expectedResult);
                expect(component.focused).toBe(false, 'should set #focused value as false');
            });

            component.onClose();
        });

        it('should #emitBlur() not emit blur event if #focused is false', fakeAsync(() => {
            let expectedResult = '';
            component.focused = false;
            component.blurEvent.subscribe(() => {
                expectedResult = 'some result';
            });

            component.onClose();
            skip(1000);

            expect(expectedResult).toEqual('');
        }));

        it('should #emitFocus() emit focus event if #focused is false', () => {
            component.focused = false;
            component.focusEvent.subscribe(() => {
                expect(component.focused).toBe(true, 'should set #focused value as true');
            });

            component.onOpen();
        });

        it('should #emitFocus() not emit focus event if #focused is true', fakeAsync(() => {
            let expectedResult = '';
            component.focused = true;
            component.focusEvent.subscribe(() => {
                expectedResult = 'some result';
            });

            component.onOpen();
            skip(1000);
            expect(expectedResult).toEqual('');
        }));

        it('should #onClose() set #isOpen as false and call #emitBlur() fn', () => {
            spyOn(component, 'emitBlur');
            component.isOpen = true;
            fixture.detectChanges();
            component.onClose();

            expect(component.isOpen).toBeFalse();
            expect(component.emitBlur).toHaveBeenCalled();
        });

        it('should #onOpen() set #isOpen as true and call #emitFocus() fn', () => {
            spyOn(component, 'emitFocus');
            component.isOpen = false;
            fixture.detectChanges();
            component.onOpen();

            expect(component.isOpen).toBeTrue();
            expect(component.emitFocus).toHaveBeenCalled();
        });

        it('should #showDropdown() be stopped if #isOpen is true', () => {
            component.isOpen = true;
            spyOn(component, 'onOpen');

            component.showDropdown();

            expect(component.showDropdown()).toBeUndefined();
            expect(component.onOpen).not.toHaveBeenCalled();
        });

        it('should #showDropdown() be called after click on select element', () => {
            const el: HTMLElement = autocompleteEl.querySelector('.sdk-autocomplete');
            spyOn(component, 'showDropdown');
            el.click();

            expect(component.showDropdown).toHaveBeenCalled();
        });

        it('should #onInput() handler do nothing if ArrowDown / ArrowUp / Enter / Escape was pushed', fakeAsync(() => {
            const inpEl: HTMLInputElement = autocompleteEl.querySelector('.sdk-autocomplete-input');
            const eventDown = new KeyboardEvent('keyup', {code: 'ArrowDown'});
            const eventUp = new KeyboardEvent('keyup', {code: 'ArrowUp'});
            const eventEnter = new KeyboardEvent('keyup', {code: 'Enter'});
            const eventEsc = new KeyboardEvent('keyup', {code: 'Escape'});
            let testValue = 'test';

            spyOn(component, 'onInput');
            fixture.detectChanges();
            inpEl.dispatchEvent(eventDown);
            inpEl.dispatchEvent(eventUp);
            inpEl.dispatchEvent(eventEnter);
            inpEl.dispatchEvent(eventEsc);
            skip(1000);

            expect(component.onInput).toHaveBeenCalledWith(eventDown || eventUp || eventEnter || eventEsc);

            component.valueChanges.subscribe(() => {
                testValue = 'new value';
            });

            expect(testValue).toBe('test');
        }));

        it('should input keyboard button emit #valueChange event', () => {
            const inpEl: HTMLInputElement = autocompleteEl.querySelector('.sdk-autocomplete-input');
            const testKey = 'a';
            const event = new KeyboardEvent('keyup', {key: testKey});
            let testValue = '';

            spyOn(component, 'onInput');
            fixture.detectChanges();
            inpEl.dispatchEvent(event);
            skip(1000);

            expect(component.onInput).toHaveBeenCalledWith(event);

            component.valueChanges.subscribe(res => {
                testValue = res;
                expect(testValue).toBe(testKey);
            });
        });

        it('should result / valueChanges / onBlur / onFocus be completed after component was destroyed', () => {
            spyOn(component.valueChanges, 'complete');
            spyOn(component.blurEvent, 'complete');
            spyOn(component.focusEvent, 'complete');
            spyOn(component.resultEvent, 'complete');

            fixture.detectChanges();
            component.ngOnInit();
            component.ngOnDestroy();

            expect(component.valueChanges.complete).toHaveBeenCalled();
            expect(component.blurEvent.complete).toHaveBeenCalled();
            expect(component.focusEvent.complete).toHaveBeenCalled();
            expect(component.resultEvent.complete).toHaveBeenCalled();
        });

        it('should #isInactive() return "true" if currentValue does not have value', () => {
            expect(component.isInactive()).toBeTrue();
        });

        it('should #isInactive() return "false" if currentValue has value', () => {
            component.currentValue = stubOptionA;
            expect(component.isInactive()).toBeFalse();
        });

        it('should #getOptions() return options with correct selected property', () => {
            component.options = options;
            const expectedOptionsList = [...options].map((el, index) => {
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

        describe('test writeValue() with value as OptionModel', () => {
            let stubValue;

            beforeEach(() => {
                component.options = options;
                stubValue = stubOptionA;
            });

            it('should #writeValue() set value to #currentValue', () => {
                component.writeValue(stubValue);
                fixture.detectChanges();

                expect(component.currentValue).toEqual(stubValue);
            });

            it('should #writeValue() call #onChange() with same value', () => {
                spyOn(component, 'onChange');
                component.writeValue(stubValue);
                fixture.detectChanges();

                expect(component.onChange).toHaveBeenCalledWith(stubValue);
            });

            it('should #writeValue() emit result event with same value', () => {
                let result;

                component.resultEvent.subscribe(res => {
                    result = res;
                    expect(result).toEqual(stubValue);
                });

                component.writeValue(stubValue);
                fixture.detectChanges();
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
            component.options = options;
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
                multi: false,
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
