import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let checkbox: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CheckboxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        checkbox = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disabled property work correctly', () => {
        component.disabled = true;
        fixture.detectChanges();
        expect(checkbox.classList.contains('disabled')).toBe(true, 'if "disabled" property set as "true"');

        component.disabled = false;
        fixture.detectChanges();
        expect(checkbox.classList.contains('disabled')).toBe(false, 'if "disabled" property set as "false"');
    });

    it('should "checked" state set active class', () => {
        component.checked = false;
        fixture.detectChanges();
        expect(checkbox.querySelector('.sdk-checkbox__indicator--active')).not.toBeTruthy();

        component.checked = true;
        fixture.detectChanges();
        expect(checkbox.querySelector('.sdk-checkbox__indicator--active')).toBeTruthy();
    });

    it('should #onClick() set valid value', () => {
        component.checked = false;
        fixture.detectChanges();
        expect(component.checked).toBe(false, 'Initial checkbox value should be "false"');

        checkbox.click();
        fixture.detectChanges();
        expect(component.checked).toBe(true, 'Checkbox value after first click should be "true"');

        checkbox.click();
        fixture.detectChanges();
        expect(component.checked).toBe(false, 'Checkbox value after second click should be "false" again');
    });

    it('should the state be small if property "small" set as "true"', () => {
        component.small = true;
        const smallSize = 16;
        fixture.detectChanges();

        expect(checkbox.querySelector('.sdk-checkbox__indicator--small')).toBeTruthy();
        expect(checkbox.querySelector('.sdk-checkbox__indicator--small').clientHeight).toEqual(smallSize);
        expect(checkbox.querySelector('.sdk-checkbox__indicator--small').clientWidth).toEqual(smallSize);
    });

    it('should the error line was displayed', () => {
        const errorText = 'Some error';

        fixture.detectChanges();

        expect(checkbox.classList.contains('sdk-input--warn')).not.toBeTruthy();
        expect(checkbox.querySelector('.sdk-checkbox__error')).not.toBeTruthy();

        component.error = errorText;
        fixture.detectChanges();

        expect(checkbox.classList.contains('sdk-input--warn')).toBeTruthy();
        expect(checkbox.querySelector('.sdk-checkbox__error')).toBeTruthy();
        expect(checkbox.querySelector('.sdk-checkbox__error').textContent.trim()).toEqual(errorText);
    });
});
