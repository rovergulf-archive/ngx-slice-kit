import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';
import {IconComponent} from '../icon/icon.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let btn: HTMLButtonElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonComponent,
                TestButtonComponent,
                IconComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        btn = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disabled property work correctly', () => {
        expect(btn.classList.contains('disabled')).toBe(false, 'if #disabled property is not set');

        component.disabled = true;
        fixture.detectChanges();
        expect(btn.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.disabled = false;
        fixture.detectChanges();
        expect(btn.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should be no size classes if #size property is empty', () => {
        expect(btn.classList.contains('sdk-button--wide')).not.toBeTruthy();
        expect(btn.classList.contains('sdk-button--full-width')).not.toBeTruthy();
    });

    it('should be added size class "sdk-button--wide" if property #size set as "wide"', () => {
        component.size = 'wide';
        fixture.detectChanges();
        component.ngOnInit();
        expect(btn.classList.contains('sdk-button--wide')).toBeTruthy();
        expect(btn.classList.contains('sdk-button--full-width')).not.toBeTruthy();
    });

    it('should be added size class "sdk-button--full-width" if property "size" set as "full-width', () => {
        component.size = 'full-width';
        fixture.detectChanges();
        component.ngOnInit();
        expect(btn.classList.contains('sdk-button--wide')).not.toBeTruthy();
        expect(btn.classList.contains('sdk-button--full-width')).toBeTruthy();
    });

    it('should the state be small if property #small set as #true', () => {
        const stubFixture = TestBed.createComponent(TestButtonComponent);
        const stubBtn = stubFixture.debugElement.nativeElement;
        const smallHeightSize = 32;
        const smallFontSize = 15;

        stubFixture.detectChanges();

        expect(stubBtn.querySelector('.sdk-button--small')).toBeTruthy();
        expect(stubBtn.querySelector('.sdk-button--small').offsetHeight).toEqual(smallHeightSize);
        expect(getComputedStyle(stubBtn.querySelector('.sdk-button--small')).fontSize).toEqual(smallFontSize + 'px');
    });

    it('should be added primary class by default if #color is not set', () => {
        const searchedClass = 'sdk-button--primary';
        fixture.detectChanges();
        expect(btn.classList.contains(searchedClass)).toBeTruthy();
    });

    it('if #color is set should be added class .sdk-button--#color', () => {
        const color = 'success';
        const searchedClass = `sdk-button--${color}`;
        component.color = color;
        fixture.detectChanges();
        component.ngOnInit();
        expect(btn.classList.contains(searchedClass)).toBeTruthy();
    });

    it('should #hasHostAttribute(attr) return true if the button has a matching attribute', () => {
        const searchedAttr = 'sdk-flat-button';
        expect(component.hasHostAttribute(searchedAttr)).toEqual(false, 'false if doesnt have attribute');
        btn.setAttribute(searchedAttr, '');
        fixture.detectChanges();
        expect(component.hasHostAttribute(searchedAttr)).toEqual(true);
    });

    it('should a state attributes be duplicate in classes', () => {
        const flatStateAttr = 'sdk-flat-button';
        const stubFixture = TestBed.createComponent(TestButtonComponent);
        const stubBtn = stubFixture.debugElement.nativeElement;
        const btnEl = stubBtn.querySelector('.sdk-button');

        expect(btnEl.classList.contains(flatStateAttr)).toEqual(true, ' should be true because btnEl has same attribute');
    });

    it('should event.preventDefault and event.stopPropagation be called if event key or code is equal "Space"', () => {
        const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation'], {code: 'Space', key: 'Space'});
        component.onKeyup(e);

        expect(e.preventDefault).toHaveBeenCalled();
        expect(e.stopPropagation).toHaveBeenCalled();
    });

    it('should event.preventDefault and event.stopPropagation be called if event key or code is equal "Enter"', () => {
        const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation'], {code: 'Enter', key: 'Enter'});
        component.onKeyup(e);

        expect(e.preventDefault).toHaveBeenCalled();
        expect(e.stopPropagation).toHaveBeenCalled();
    });

    it('should event.preventDefault and event.stopPropagation not be called if event key or code is not equal "Enter" or "Space"', () => {
        const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation'], {code: 'k', key: 'k'});
        component.onKeyup(e);

        expect(e.preventDefault).not.toHaveBeenCalled();
        expect(e.stopPropagation).not.toHaveBeenCalled();
    });

    it('should #onKeyup() be called by keypress event', () => {
        const event = new KeyboardEvent('keypress', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        spyOn(component, 'onKeyup');
        btn.dispatchEvent(event);
        expect(component.onKeyup).toHaveBeenCalled();
    });
});

// Wrapper component for test small button state
@Component({
    template: `<button sdk-flat-button [small]="true">Hello World</button>`,
})
class TestButtonComponent {
}
