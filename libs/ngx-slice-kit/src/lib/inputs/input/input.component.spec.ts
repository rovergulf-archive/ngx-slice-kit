import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let input: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InputComponent, TestInputComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should the state be small if property #small set as #true', () => {
        component.small = true;
        const smallHeightSize = 32;
        const smallFontSize = 15;

        fixture.detectChanges();

        const el: HTMLElement = input.querySelector('.sdk-input__input--small');

        expect(el).toBeTruthy();
        expect(input.querySelector('.sdk-input__label--small')).toBeTruthy();
        expect(el.offsetHeight).toEqual(smallHeightSize);
        expect(getComputedStyle(input.querySelector('.sdk-input__input--small')).fontSize).toEqual(smallFontSize + 'px');
        expect(getComputedStyle(input.querySelector('.sdk-input__label--small')).fontSize).toEqual(smallFontSize + 'px');
    });

    it('should tabindex property set correct attribute', () => {
        expect(input.querySelector('.sdk-input__input').getAttribute('tabindex')).toEqual('0', 'default tabindex value is 0');

        component.tabindex = 3;
        fixture.detectChanges();

        expect(input.querySelector('.sdk-input__input').getAttribute('tabindex')).toEqual('3');
    });

    it('should disabled property work correctly', () => {
        expect(input.classList.contains('disabled')).toBe(false, 'if #disabled property is not set');

        component.disabled = true;
        fixture.detectChanges();
        expect(input.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.disabled = false;
        fixture.detectChanges();
        expect(input.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should placeholder will be correct if it set', () => {
        expect(component.placeholder).toEqual('', 'it should be default value as empty string if placeholder is not set');

        const newPlaceholder = 'Some new placeholder';
        component.placeholder = newPlaceholder;
        fixture.detectChanges();

        expect(component.placeholder).toEqual(newPlaceholder, 'it should be equal to user value');
    });

    it('should label will be correct if it set', () => {
        expect(component.label).toBeUndefined('should be undefined if it does not set');
        expect(input.querySelector('.sdk-input__label').textContent).toEqual('', 'text should be empty if label and text content does not set');

        const newLabel = 'Some label';
        component.label = newLabel;
        fixture.detectChanges();

        expect(component.label).toEqual(newLabel, 'should be equal to user value');
        expect(input.querySelector('.sdk-input__label').textContent.trim()).toEqual(newLabel, 'should be equal to user value');
    });

    it('should label will be correct if ng-content is set', () => {
        const stubFixture = TestBed.createComponent(TestInputComponent);
        const stubInput = stubFixture.debugElement.nativeElement;

        stubFixture.detectChanges();
        expect(stubInput.querySelector('.sdk-input__label').textContent.trim()).toEqual('Hello World');
    });

    it('should be input type be correct', () => {
        const inputElement = input.querySelector('input');
        expect(inputElement.type).toEqual('text', 'text is default value');

        inputElement.type = 'number';
        fixture.detectChanges();
        expect(inputElement.type).toEqual('number', 'should be equal to user value');
    });

    it('should be #autocomplete will be correct if it set', () => {
        const inputElement = input.querySelector('input');
        fixture.detectChanges();
        expect(inputElement.getAttribute('autocomplete')).toEqual('off', 'off is default');

        component.autocomplete = 'on';
        fixture.detectChanges();
        expect(inputElement.autocomplete).toEqual('on', 'on if it set');
    });

    it('value can\'t be less then #min property', () => {
        const minValue = 5;
        component.type = 'number';

        component.writeValue(1);
        expect(component.value).toEqual(1, 'if #min property is undefined, value can be any low');

        component.min = minValue;
        fixture.detectChanges();
        component.writeValue(2);
        expect(component.value).toEqual(minValue, 'if value is less then #min property, value should be equal #min');
    });

    it('value can\'t be more then #max property', () => {
        const maxValue = 24;
        component.type = 'number';

        component.writeValue(124);
        expect(component.value).toEqual(124, 'if #max property is undefined, value can be any big');

        component.max = maxValue;
        fixture.detectChanges();
        component.writeValue(26);
        expect(component.value).toEqual(maxValue, 'if value is more then #max property, value should be equal #max');
    });

    it('should be no size classes if #size property is empty', () => {
        expect(input.querySelector('.sdk-input-wrap--full-width')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--wide')).not.toBeTruthy();
    });

    it('should be added size class "sdk-input-wrap--wide" if property #size set as "wide"', () => {
        component.size = 'wide';
        fixture.detectChanges();
        component.ngOnInit();
        expect(input.querySelector('.sdk-input-wrap--wide')).toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--full-width')).not.toBeTruthy();
    });

    it('should be added size class "sdk-input-wrap--full-width" if property "size" set as "full-width', () => {
        component.size = 'full-width';
        fixture.detectChanges();
        component.ngOnInit();
        expect(input.querySelector('.sdk-input-wrap--wide')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--full-width')).toBeTruthy();
    });

    it('should #caption display if user set', () => {
        const caption = 'Some caption';
        expect(input.querySelector('.sdk-input__caption')).not.toBeTruthy();

        component.caption = caption;
        fixture.detectChanges();
        expect(input.querySelector('.sdk-input__caption')).toBeTruthy();
        expect(input.querySelector('.sdk-input__caption').textContent.trim()).toEqual(caption);
    });

    it('should be added icon position class if user set icon url', () => {
        const iconUrl = 'https://someUrl/icon.png';
        expect(input.querySelector('.sdk-input__input--icon-left')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input__input--icon-right')).not.toBeTruthy();

        component.icon = iconUrl;
        fixture.detectChanges();
        expect(input.querySelector('.sdk-input__input--icon-left')).toBeTruthy();
        expect(input.querySelector('.sdk-input__input--icon-right')).not.toBeTruthy();

        component.iconPosition = 'right';
        fixture.detectChanges();
        expect(input.querySelector('.sdk-input__input--icon-left')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input__input--icon-right')).toBeTruthy();
    });

    it('should the #error line was displayed', () => {
        const errorText = 'Some error';

        fixture.detectChanges();

        expect(input.classList.contains('sdk-input--warn')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input__error')).not.toBeTruthy();

        component.error = errorText;
        fixture.detectChanges();

        expect(input.classList.contains('sdk-input--warn')).toBeTruthy();
        expect(input.querySelector('.sdk-input__error')).toBeTruthy();
        expect(input.querySelector('.sdk-input__error').textContent.trim()).toEqual(errorText);
    });

    it('should input #focus() set #focused property as true', () => {
        expect(component.focused).toEqual(false, 'should be false by default');
        expect(input.querySelector('.sdk-input__label--focused')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--focused')).not.toBeTruthy();

        component.focus();
        fixture.detectChanges();
        expect(component.focused).toEqual(true, 'should be focused after #focus()');
        expect(input.querySelector('.sdk-input__label--focused')).toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--focused')).toBeTruthy();
    });

    it('should input #blur() set #focused property as false', () => {
        component.focus();
        fixture.detectChanges();
        expect(component.focused).toEqual(true, 'should be focused after #focus()');
        expect(input.querySelector('.sdk-input__label--focused')).toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--focused')).toBeTruthy();

        component.blur();
        fixture.detectChanges();
        expect(component.focused).toEqual(false, 'should be false after blur');
        expect(input.querySelector('.sdk-input__label--focused')).not.toBeTruthy();
        expect(input.querySelector('.sdk-input-wrap--focused')).not.toBeTruthy();
    });

    it('should #change() correctly change input value', () => {
        const inputEl: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.sdk-input__input');
        let newValue = 'Some value';

        const event = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        fixture.detectChanges();
        inputEl.value = newValue;

        inputEl.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal new value');

        newValue = 'Another value';
        fixture.detectChanges();
        inputEl.value = newValue;
        inputEl.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal updated new value');
    });

    it('should iconUrl getter will be correct', () => {
        const iconUrl = 'https://some/icon.png';
        expect(component.iconUrl).toEqual('', 'if component has no #icon then #iconUrl should be empty');

        component.icon = iconUrl;
        fixture.detectChanges();
        expect(component.iconUrl).toEqual(`url(${iconUrl})`, 'should have valid format if #icon is set');
    });

    it('should #value be equal user value', () => {
        const newValue = 'Some value';
        const inputEl: HTMLInputElement = input.querySelector('.sdk-input__input');
        expect(component.value).toBeUndefined();

        component.writeValue(newValue);
        fixture.detectChanges();

        expect(component.value).toEqual(newValue);
        expect(inputEl.value).toEqual(newValue, 'should input element value be equal component #value property');
    });

    it('should #emitFocus() emit correct event', () => {
        const newValue = 'Some value';
        const inputEl = fixture.debugElement.query(By.css('.sdk-input__input'));
        const expectedEventBody = {
            target: input,
            eventName: 'focus',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.onFocus.subscribe(e => {
            eventBody = e;
        });
        inputEl.triggerEventHandler('focus', null);
        fixture.detectChanges();

        expect(eventBody.value).toEqual(expectedEventBody.value);
        expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
        expect(eventBody.target).toEqual(expectedEventBody.target);
    });

    it('should #emitBlur() emit correct event', () => {
        const newValue = 'Some value';
        const inputEl = fixture.debugElement.query(By.css('.sdk-input__input'));
        const expectedEventBody = {
            target: input,
            eventName: 'blur',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.onBlur.subscribe(e => {
            eventBody = e;
        });
        inputEl.triggerEventHandler('blur', null);
        fixture.detectChanges();

        expect(eventBody.value).toEqual(expectedEventBody.value);
        expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
        expect(eventBody.target).toEqual(expectedEventBody.target);
    });

    it('should autocomplete set #focused as true and add focused classes', () => {
        component.autofocus = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterContentInit();
        component.ngAfterViewInit();
        fixture.detectChanges();


        const label: HTMLElement = input.querySelector('.sdk-input__label');
        const wrapper: HTMLElement = input.querySelector('.sdk-input-wrap');

        expect(component.focused).toEqual(true, 'should be focused after #focus()');
        expect(label).toHaveClass('sdk-input__label--focused');
        expect(wrapper).toHaveClass('sdk-input-wrap--focused');
    });
});

// InputComponent test wrapper
@Component({
    template: `
        <sdk-input>Hello World</sdk-input>`,
})
class TestInputComponent {
}
