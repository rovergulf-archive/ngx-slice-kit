import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;
    let textarea: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TextareaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        textarea = fixture.debugElement.nativeElement;
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
        expect(textarea.querySelector('.sdk-textarea__textarea').getAttribute('tabindex')).toEqual('0', 'default tabindex value is 0');

        component.tabindex = 3;
        fixture.detectChanges();

        expect(textarea.querySelector('.sdk-textarea__textarea').getAttribute('tabindex')).toEqual('3');
    });

    it('should the state be small if property #small set as true', () => {
        expect(textarea.querySelector('.sdk-textarea__textarea--small')).not.toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__label--small')).not.toBeTruthy();

        component.small = true;
        component.label = 'Some label';
        fixture.detectChanges();

        expect(textarea.querySelector('.sdk-textarea__textarea--small')).toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__label--small')).toBeTruthy();
    });

    it('should label will be correct if it set', () => {
        expect(component.label).toBeUndefined('should be undefined if it does not set');
        expect(textarea.querySelector('.sdk-textarea__label').textContent.trim()).toEqual('', 'text should be empty if label and text content does not set');

        const newLabel = 'Some label';
        component.label = newLabel;
        fixture.detectChanges();

        expect(component.label).toEqual(newLabel, 'should be equal to user value');
        expect(textarea.querySelector('.sdk-textarea__label').textContent.trim()).toEqual(newLabel, 'should be equal to user value');
    });

    it('should #caption display if user set', () => {
        const caption = 'Some caption';
        expect(textarea.querySelector('.sdk-textarea__caption')).not.toBeTruthy();

        component.caption = caption;
        fixture.detectChanges();
        expect(textarea.querySelector('.sdk-textarea__caption')).toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__caption').textContent.trim()).toEqual(caption);
    });

    it('should the #error line was displayed', () => {
        const errorText = 'Some error';

        fixture.detectChanges();

        expect(textarea.classList.contains('sdk-textarea--warn')).not.toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__error')).not.toBeTruthy();

        component.error = errorText;
        fixture.detectChanges();

        expect(textarea.classList.contains('sdk-textarea--warn')).toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__error')).toBeTruthy();
        expect(textarea.querySelector('.sdk-textarea__error').textContent.trim()).toEqual(errorText);
    });

    it('should disabled property work correctly', () => {
        expect(textarea.classList.contains('disabled')).toBe(false, 'if #disabled property is not set');

        component.disabled = true;
        fixture.detectChanges();
        expect(textarea.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.disabled = false;
        fixture.detectChanges();
        expect(textarea.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
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
        expect(textarea.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.setDisabledState(false);
        fixture.detectChanges();
        expect(component.disabled).toEqual(false, 'should be true after #setDisabledState(false)');
        expect(textarea.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should #value be equal element value', () => {
        const newValue = 'Some value';
        const textareaEl: HTMLTextAreaElement = textarea.querySelector('.sdk-textarea__textarea');
        expect(component.value).toBeUndefined();

        component.writeValue(newValue);
        fixture.detectChanges();

        expect(component.value).toEqual(newValue);
        expect(textareaEl.value).toEqual(newValue, 'should textarea element value be equal component #value property');
    });

    it('textarea element cant have height value less then #minHeight', () => {
        const minHeight = 76;
        const padding = 16;
        const textareaEl: HTMLElement = textarea.querySelector('.sdk-textarea__textarea');
        component.minHeight = minHeight;

        textareaEl.style.height = `20px`;
        fixture.detectChanges();
        expect(textareaEl.offsetHeight).toEqual(minHeight + padding, 'should use #minHeight value if height is less');

        const validHeight = 100;
        textareaEl.style.height = `${validHeight}px`;
        fixture.detectChanges();
        expect(textareaEl.offsetHeight).toEqual(validHeight + padding, 'can be that height');
    });

    it('textarea element cant have height value more then #maxHeight', () => {
        const maxHeight = 280;
        const padding = 16;
        const textareaEl: HTMLElement = textarea.querySelector('.sdk-textarea__textarea');
        component.maxHeight = maxHeight;

        textareaEl.style.height = `300px`;
        fixture.detectChanges();
        expect(textareaEl.offsetHeight).toEqual(maxHeight + padding, 'should use #maxHeight value if height is more');

        const validHeight = 100;
        textareaEl.style.height = `${validHeight}px`;
        fixture.detectChanges();
        expect(textareaEl.offsetHeight).toEqual(validHeight + padding, 'can be that height');
    });

    it('should add special class .full-width if #fullWidth is true', () => {
        expect(textarea.classList.contains('full-width')).toEqual(false, 'doesnt have full-width class if #fullWidth is false');

        component.fullWidth = true;
        fixture.detectChanges();
        expect(textarea.classList.contains('full-width')).toEqual(true, 'should contain full-width class if #fullWidth is true');
    });

    it('should #change() correctly change textarea value', () => {
        const textareaEl: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelector('.sdk-textarea__textarea');
        let newValue = 'Some value';

        const event = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        fixture.detectChanges();
        textareaEl.value = newValue;

        textareaEl.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal new value');

        newValue = 'Another value';
        fixture.detectChanges();
        textareaEl.value = newValue;
        textareaEl.dispatchEvent(event);
        expect(component.value).toEqual(newValue, 'should be equal updated new value');
    });

    it('should #onFocus() emit correct event', () => {
        const newValue = 'Some value';
        const textareaEl = fixture.debugElement.query(By.css('.sdk-textarea__textarea'));
        const expectedEventBody = {
            target: textarea,
            eventName: 'focus',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.focus.subscribe(e => {
            eventBody = e;

            expect(eventBody.value).toEqual(expectedEventBody.value);
            expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
            expect(eventBody.target).toEqual(expectedEventBody.target);
        });
        textareaEl.triggerEventHandler('focus', null);
        fixture.detectChanges();
    });

    it('should #onBlur() emit correct event', () => {
        const newValue = 'Some value';
        const textareaEl = fixture.debugElement.query(By.css('.sdk-textarea__textarea'));
        const expectedEventBody = {
            target: textarea,
            eventName: 'blur',
            value: newValue
        };
        let eventBody;

        component.writeValue(newValue);
        component.blur.subscribe(e => {
            eventBody = e;

            expect(eventBody.value).toEqual(expectedEventBody.value);
            expect(eventBody.eventName).toEqual(expectedEventBody.eventName);
            expect(eventBody.target).toEqual(expectedEventBody.target);
        });
        textareaEl.triggerEventHandler('blur', null);
        fixture.detectChanges();
    });

    it('should be .sdk-textarea__pull-angle-wrapper element if #resizable is true', () => {
        component.resizable = true;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textarea.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeTruthy();
    });

    it('should be no .sdk-textarea__pull-angle-wrapper element if #disabled is true', () => {
        component.resizable = false;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textarea.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeNull();
    });

    it('should be no .sdk-textarea__pull-angle-wrapper element if #resizable is false', () => {
        component.disabled = true;
        component.ngOnInit();
        fixture.detectChanges();

        const el: HTMLElement = textarea.querySelector('.sdk-textarea__pull-angle-wrapper');

        expect(el).toBeNull();
    });
});
