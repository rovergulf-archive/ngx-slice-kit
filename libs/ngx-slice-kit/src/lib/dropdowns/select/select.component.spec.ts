import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { OptionsService } from '../options.service';
import { DropdownService } from '../dropdown.service';
import { PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownOptions } from '../dropdown.model';
import {skip} from 'rxjs/operators';
import {IconComponent} from '../../buttons/icon/icon.component';
import {OptionModel} from 'ngx-slice-kit';

const options: OptionModel[] = [
    {value: 1, label: 'Red Dead Redemption 2'},
    {value: 2, label: 'Death Stranding'},
    {value: 3, label: 'Bloodborne'},
    {value: 4, label: 'Witcher 3'},
    {value: 5, label: 'Cyberpunk 2077'},
    {value: 6, label: 'Assassins Creed: Valhalla'},
    {value: 7, label: 'Mortal Kombat 11'}
];

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;
    let selectDe;
    let selectEl;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const testIndexA = 0;
    const testIndexB = 2;
    const stubOptionA = options[testIndexA];
    const stubOptionB = options[testIndexB];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectComponent,
                IconComponent
            ],
            providers: [
                // DOCUMENT,
                {provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID},
                OptionsService,
                DropdownService
            ]
        });
    }));

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(SelectComponent);
            component = fixture.componentInstance;
            selectDe = fixture.debugElement;
            selectEl = selectDe.nativeElement;
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
            const labelEl = selectEl.querySelector('.sdk-select-label');
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
            const reqMark = selectEl.querySelector('.sdk-select-label-required-mark');
            expect(reqMark).toBeTruthy();
        });

        it('should required mark not be displayed if #required set as false', () => {
            const reqMark = selectEl.querySelector('.sdk-select-label-required-mark');
            expect(reqMark).toBeFalsy();
        });

        it('should icon be displayed if #icon set as string with icon name', () => {
            const testIconName = 'star';
            component.icon = testIconName;
            fixture.detectChanges();

            const iconEl = selectEl.querySelector('.sdk-select-icon');
            expect(iconEl.classList.contains('actions')).not.toBeTruthy('it should not be actions icon');
        });

        it('should icon not be displayed if #icon does not set', () => {
            const iconEl = selectEl.querySelector('.sdk-select-icon');
            expect(iconEl.classList.contains('actions')).toBeTruthy('it should be only one "actions" icon in component');
        });

        it('should caption element be displayed if #caption property has a value', () => {
            const caption = 'Dont listen to the radio';
            component.caption = caption;
            fixture.detectChanges();
            const captionEl = selectEl.querySelector('.sdk-caption');
            expect(captionEl).toBeTruthy();
            expect(captionEl.textContent.trim()).toEqual(caption);
        });

        it('should caption element not be displayed if #caption property has no value', () => {
            const captionEl = selectEl.querySelector('.sdk-caption');
            expect(captionEl).not.toBeTruthy();
        });

        it('should element has error line and error class if #error property has value', () => {
            const errorText = 'Don\'t speak upon the telephone';
            const errorClass = 'invalid';

            component.error = errorText;
            fixture.detectChanges();

            const selectWrapperEl = selectEl.querySelector('.sdk-select-wrap');
            const errorEl = selectEl.querySelector('.sdk-error');
            const errorElText = errorEl.textContent.trim();

            expect(selectEl.classList.contains(errorClass)).toBeTrue();
            expect(selectWrapperEl.classList.contains(errorClass)).toBeTrue();
            expect(errorEl).toBeTruthy('error element should be created');
            expect(errorElText).toEqual(errorText);
        });

        it('should element has no error line and no error class if #error property has no value', () => {
            const errorClass = 'invalid';

            const selectWrapperEl = selectEl.querySelector('.sdk-select-wrap');
            const errorEl = selectEl.querySelector('.sdk-error');

            expect(selectEl.classList.contains(errorClass)).not.toBeTrue();
            expect(selectWrapperEl.classList.contains(errorClass)).not.toBeTrue();
            expect(errorEl).not.toBeTruthy('element should not be created');
        });

        it('should host have "disabled" class', () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(selectEl.classList.contains('disabled')).toBeTrue();
            expect(component.isDisabled).toBe(component.disabled);
        });

        it('should #setDisabledState() set correctly #disabled property as true or false', () => {
            component.setDisabledState(true);
            fixture.detectChanges();
            expect(selectEl.classList.contains('disabled')).toBeTrue();

            component.setDisabledState(false);
            fixture.detectChanges();
            expect(selectEl.classList.contains('disabled')).not.toBeTrue();
        });

        it('should #enableNullValue be false by default"', () => {
            expect(component.enableNullValue).toBeFalse();
        });

        it('should #currentValues be undefined by default', () => {
            expect(component.currentValues).toBeUndefined();
        });

        it('should placeholder set value as empty string by default', () => {
            const defaultPlaceholder = '';
            const placeholderEl = selectEl.querySelector('.inactive');
            const placeholderElText = placeholderEl.textContent.trim();
            expect(placeholderElText).toBe(defaultPlaceholder);
        });

        it('should placeholder value be set by #placeholder property', () => {
            const placeholder = 'custom placeholder';
            component.placeholder = placeholder;
            fixture.detectChanges();
            const placeholderEl = selectEl.querySelector('.inactive');
            const placeholderElText = placeholderEl.textContent.trim();
            expect(placeholderElText).toBe(placeholder);
        });

        it('should placeholder element be hidden if #isInactive() is true', () => {
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            const placeholderEl = selectEl.querySelector('.inactive');
            expect(placeholderEl).toBeFalsy();
        });

        it('should #selected() set value in .sdk-select-value', () => {
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            const selectValueEl = selectEl.querySelector('.sdk-select-value');
            const selectValueText = selectValueEl.textContent.trim();

            expect(component.selected()).toBe(selectValueText);
        });

        it('should #selected() set title in .sdk-select-value', () => {
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            const selectValueEl = selectEl.querySelector('.sdk-select-value');
            const selectValueTitle = selectValueEl.getAttribute('title');

            expect(component.selected()).toBe(selectValueTitle);
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
            const chevronEl = selectEl.querySelector('.icon-chevron');
            const clearEl = selectEl.querySelector('.icon-clear');
            expect(clearEl).toBeTruthy();
            expect(chevronEl).not.toBeTruthy();
        });

        it('should .icon-chevron be displayed if #hasValueToDrop() is false and .icon-clear not', () => {
            const chevronEl = selectEl.querySelector('.icon-chevron');
            const clearEl = selectEl.querySelector('.icon-clear');
            expect(chevronEl).toBeTruthy();
            expect(clearEl).not.toBeTruthy();
        });

        it('should #hasValueToDrop() return false if #enableNullValue as false or #isInactive() is true', () => {
            component.enableNullValue = false;
            component.currentValue = stubOptionA;
            fixture.detectChanges();
            expect(component.hasValuesToDrop()).toBe(false);

            component.enableNullValue = false;
            component.currentValue = undefined;
            fixture.detectChanges();
            expect(component.hasValuesToDrop()).toBe(false);
        });

        it('should #small property add .small class to label and select-wrapper', () => {
            component.small = true;
            fixture.detectChanges();
            const wrapper = selectEl.querySelector('.sdk-select-wrap');
            const label = selectEl.querySelector('.sdk-select-label');

            expect(wrapper.classList.contains('small')).toBeTrue();
            expect(label.classList.contains('small')).toBeTrue();
        });

        it('should #isOpen as true add .active class for select-wrapper and icon-wrapper', () => {
            component.isOpen = true;
            component.enableNullValue = true;
            fixture.detectChanges();

            const wrapper = selectEl.querySelector('.sdk-select-wrap');
            const icon = selectEl.querySelector('.interface-icon-wrap');

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
            component.focused = true;
            component.blurEvent.subscribe(() => {
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
            const el: HTMLElement = selectEl.querySelector('.sdk-select');
            spyOn(component, 'showDropdown');
            el.click();

            expect(component.showDropdown).toHaveBeenCalled();
        });

        /*
        *   Test writeValue method with different value types;
        */

        describe('test writeValue() with value as set of options', () => {
            let stubValues;

            beforeEach(() => {
                component.options = options;
                component.multi = true;
                stubValues = new Set([stubOptionA, stubOptionB]);
            });

            it('should #writeValue() set value to #currentValues', () => {
                component.writeValue(stubValues);
                fixture.detectChanges();

                expect(component.currentValues).toEqual(stubValues);
            });

            it('should #writeValue() call #onChange() with value as object', () => {
                const expectedResult = component.options.filter(o => stubValues.has(o));
                spyOn(component, 'onChange');
                component.writeValue(stubValues);
                fixture.detectChanges();

                expect(component.onChange).toHaveBeenCalledWith(expectedResult);
            });

            it('should #writeValue() emit result event with value as object', () => {
                const expectedResult = component.options.filter(o => stubValues.has(o));
                let result;

                component.resultEvent.subscribe(res => {
                    result = res;
                });

                component.writeValue(stubValues);
                fixture.detectChanges();

                expect(result).toEqual(expectedResult);
            });
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
                });

                component.writeValue(stubValue);
                fixture.detectChanges();

                expect(result).toEqual(stubValue);
            });
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
                expect(component.currentValues.size).toBe(0);
            });

            it('should #isInactive() return "true" if currentValues does not have elements', () => {
                expect(component.isInactive()).toBeTrue();
            });

            it('should #isInactive() return "false" if currentValues has elements', () => {
                component.currentValues.add(stubOptionA);
                expect(component.isInactive()).toBeFalse();
            });

            it('should #getOptions() return options with correct selected property', () => {
                component.options = options;
                const expectedOptionsList = [...options].map((el, index) => {
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
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_SERVER_ID});

            fixture = TestBed.createComponent(SelectComponent);
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
            fixture = TestBed.createComponent(SelectComponent);
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
                triggerRect: component.selectElem.nativeElement.getBoundingClientRect(),
                fitWidth: true,
                multi: component.multi,
                parentElem: component.selectElem.nativeElement,
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
