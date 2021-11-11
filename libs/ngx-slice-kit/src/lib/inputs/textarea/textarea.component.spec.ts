import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;
    let textareaDe: DebugElement;
    let textareaEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TextareaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        textareaDe = fixture.debugElement;
        textareaEl = textareaDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should placeholder will be correct if it set', () => {
        expect(component.placeholder).toEqual('', 'it should be default value if placeholder is not set');

        const newPlaceholder = 'Some new placeholder';
        component.placeholder = newPlaceholder;
        fixture.detectChanges();

        expect(component.placeholder).toEqual(newPlaceholder, 'it should be equal to user value');
    });

    it('should tabindex property set correct attribute', () => {
        expect(textareaEl.querySelector('.sdk-textarea__textarea').getAttribute('tabindex')).toEqual('0', 'default tabindex value is 0');

        component.tabindex = 3;
        fixture.detectChanges();

        expect(textareaEl.querySelector('.sdk-textarea__textarea').getAttribute('tabindex')).toEqual('3');
    });

    it('should the state be small if property #small set as true', () => {
        expect(textareaEl.querySelector('.sdk-textarea__textarea--small')).not.toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__label--small')).not.toBeTruthy();

        component.small = true;
        component.label = 'Some label';
        fixture.detectChanges();

        expect(textareaEl.querySelector('.sdk-textarea__textarea--small')).toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__label--small')).toBeTruthy();
    });

    it('should label will be correct if it set', () => {
        expect(component.label).toBeUndefined('should be undefined if it does not set');
        expect(textareaEl.querySelector('.sdk-textarea__label').textContent.trim()).toEqual('', 'text should be empty if label and text content does not set');

        const newLabel = 'Some label';
        component.label = newLabel;
        fixture.detectChanges();

        expect(component.label).toEqual(newLabel, 'should be equal to user value');
        expect(textareaEl.querySelector('.sdk-textarea__label').textContent.trim()).toEqual(newLabel, 'should be equal to user value');
    });

    it('should #caption display if user set', () => {
        const caption = 'Some caption';
        expect(textareaEl.querySelector('.sdk-textarea__caption')).not.toBeTruthy();

        component.caption = caption;
        fixture.detectChanges();
        expect(textareaEl.querySelector('.sdk-textarea__caption')).toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__caption').textContent.trim()).toEqual(caption);
    });

    it('should the #error line was displayed', () => {
        const errorText = 'Some error';

        fixture.detectChanges();

        expect(textareaEl.classList.contains('sdk-textarea--warn')).not.toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__error')).not.toBeTruthy();

        component.error = errorText;
        fixture.detectChanges();

        expect(textareaEl.classList.contains('sdk-textarea--warn')).toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__error')).toBeTruthy();
        expect(textareaEl.querySelector('.sdk-textarea__error').textContent.trim()).toEqual(errorText);
    });

    it('should disabled property work correctly', () => {
        expect(textareaEl.classList.contains('disabled')).toBe(false, 'if #disabled property is not set');

        component.disabled = true;
        fixture.detectChanges();
        expect(textareaEl.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.disabled = false;
        fixture.detectChanges();
        expect(textareaEl.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should #isEmpty() return true if value is empty or undefined', () => {
        expect(component.isEmpty()).toEqual(true, 'if value is empty');

        component.writeValue('Some value');
        fixture.detectChanges();
        expect(component.isEmpty()).toEqual(false, 'should be false if value is not empty');
    });

    it('should #setDisabledState() set disable state by boolean argument', () => {
        expect(component.disabled).not.toBeTruthy();

        component.setDisabledState(true);
        fixture.detectChanges();
        expect(component.disabled).toEqual(true, 'should be true after #setDisabledState(true)');
        expect(textareaEl.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.setDisabledState(false);
        fixture.detectChanges();
        expect(component.disabled).toEqual(false, 'should be true after #setDisabledState(false)');
        expect(textareaEl.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should #value be equal element value', () => {
        const newValue = 'Some value';
        const textarea: HTMLTextAreaElement = textareaEl.querySelector('.sdk-textarea__textarea');
        expect(component.value).toBeUndefined();

        component.writeValue(newValue);
        fixture.detectChanges();

        expect(component.value).toEqual(newValue);
        expect(textarea.value).toEqual(newValue, 'should textarea element value be equal component #value property');
    });

    it('textarea element cant have height value less then #minHeight', () => {
        const minHeight = 76;
        const textarea: HTMLElement = textareaEl.querySelector('.sdk-textarea__textarea');
        component.minHeight = minHeight;

        textarea.style.height = `20px`;
        fixture.detectChanges();
        expect(textarea.offsetHeight).toEqual(minHeight, 'should use #minHeight value if height is less');

        const validHeight = 100;
        textarea.style.height = `${validHeight}px`;
        fixture.detectChanges();
        expect(textarea.offsetHeight).toEqual(validHeight, 'can be that height');
    });

    it('textarea element cant have height value more then #maxHeight', () => {
        const maxHeight = 280;
        const textarea: HTMLElement = textareaEl.querySelector('.sdk-textarea__textarea');
        component.maxHeight = maxHeight;

        textarea.style.height = `300px`;

        fixture.detectChanges();
        expect(textarea.offsetHeight).toEqual(maxHeight, 'should use #maxHeight value if height is more');

        const validHeight = 100;
        textarea.style.height = `${validHeight}px`;
        fixture.detectChanges();
        expect(textarea.offsetHeight).toEqual(validHeight, 'can be that height');
    });

    it('should add special class .full-width if #fullWidth is true', () => {
        expect(textareaEl.classList.contains('full-width')).toEqual(false, 'doesnt have full-width class if #fullWidth is false');

        component.fullWidth = true;
        fixture.detectChanges();
        expect(textareaEl.classList.contains('full-width')).toEqual(true, 'should contain full-width class if #fullWidth is true');
    });

    it('should #change() correctly change textarea value', () => {
        const textarea: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelector('.sdk-textarea__textarea');
        let newValue = 'Some value';

        const event = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        textarea.value = newValue;

        textarea.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal new value');

        newValue = 'Another value';
        textarea.value = newValue;
        textarea.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal updated new value');
    });

    it('should #onFocus() emit correct event', () => {
        const newValue = 'Some value';
        const textarea = fixture.debugElement.query(By.css('.sdk-textarea__textarea'));
        const expectedEventBody = {
            target: textareaEl,
            eventName: 'focus',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.focusEvent.subscribe(e => {
            eventBody = e;

            expect(eventBody.value).toEqual(expectedEventBody.value);
            expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
            expect(eventBody.target).toEqual(expectedEventBody.target);
        });
        textarea.triggerEventHandler('focus', null);
        fixture.detectChanges();
    });

    it('should #onBlur() emit correct event', () => {
        const newValue = 'Some value';
        const textarea = fixture.debugElement.query(By.css('.sdk-textarea__textarea'));
        const expectedEventBody = {
            target: textareaEl,
            eventName: 'blur',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.blurEvent.subscribe(e => {
            eventBody = e;

            expect(eventBody.value).toEqual(expectedEventBody.value);
            expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
            expect(eventBody.target).toEqual(expectedEventBody.target);
        });
        textarea.triggerEventHandler('blur', null);
        fixture.detectChanges();
    });

    it('should be .sdk-textarea__pull-angle-wrapper element if #resizable is true', () => {
        component.resizable = true;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textareaEl.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeTruthy();
    });

    it('should be no .sdk-textarea__pull-angle-wrapper element if #disabled is true', () => {
        component.resizable = false;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textareaEl.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeNull();
    });

    it('should be no .sdk-textarea__pull-angle-wrapper element if #resizable is false', () => {
        component.disabled = true;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textareaEl.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeNull();
    });

    it('should #setDisabled set #disabled property equal his argument', () => {
        component.setDisabledState(true);
        expect(component.disabled).toEqual(true);

        component.setDisabledState(false);
        expect(component.disabled).toEqual(false);
    });

    it('should #registerOnTouched set #onTouched', () => {
        const fn = (): string => 'test';
        component.registerOnTouched(fn);
        expect(component.onTouched).toEqual(fn);
    });

    it('should #regiserOnChange set #onChange', () => {
        const fn = (): string => 'test';
        component.registerOnChange(fn);
        expect(component.onChange).toEqual(fn);
    });

    it('should textarea element has correct size if #fullWidth is true', () => {
        component.fullWidth = true;
        component.ngOnInit();

        const parentElWidth = textareaEl.parentElement.offsetWidth;
        expect(component.textarea.nativeElement.style.width).toEqual(`${parentElWidth}px`);
    });
});
