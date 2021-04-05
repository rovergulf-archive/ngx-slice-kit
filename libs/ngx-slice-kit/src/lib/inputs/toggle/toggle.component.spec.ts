import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
    let component: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;
    let toggle: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        toggle = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disabled property work correctly', () => {
        expect(toggle.classList.contains('disabled')).toBe(false, 'if #disabled property is not set');

        component.disabled = true;
        fixture.detectChanges();
        expect(toggle.classList.contains('disabled')).toBe(true, 'if #disabled property set as #true');

        component.disabled = false;
        fixture.detectChanges();
        expect(toggle.classList.contains('disabled')).toBe(false, 'if #disabled property set as #false');
    });

    it('should #isActive be false by default', () => {
        expect(component.isActive).toEqual(false);
    });

    it('should #isActive be true if it set', () => {
        component.isActive = true;
        fixture.detectChanges();
        expect(component.isActive).toEqual(true);
    });

    it('should element have .sdk-switch--on class if #isActive is true', () => {
        const activeClass = 'sdk-switch--on';
        component.isActive = true;
        component.ngOnInit();
        fixture.detectChanges();
        expect(toggle).toHaveClass(activeClass);
    });

    it('should element have no .sdk-switch--on class if #isActive is false', () => {
        const activeClass = 'sdk-switch--on';
        fixture.detectChanges();
        expect(toggle.classList.contains(activeClass)).toEqual(false);
    });

    it('should #writeValue() set value by attr', () => {
        const on = true;
        const off = false;

        component.writeValue(on);
        fixture.detectChanges();
        expect(component.on).toEqual(true, 'should be true if it turn on');

        component.writeValue(off);
        fixture.detectChanges();
        expect(component.on).toEqual(false, 'should be false if it turn off');
    });

    it('should the state be small if property #small set as #true', () => {
        const smallHeightSize = 16;
        component.small = true;

        fixture.detectChanges();

        expect(toggle.classList.contains('sdk-switch--small')).toBeTruthy();
        expect(toggle.offsetHeight).toEqual(smallHeightSize);
    });

    it('onclick()', () => {
        const initialStatus = component.on;
        expect(initialStatus).toEqual(component.on);

        component.onclick();
        fixture.detectChanges();
        expect(initialStatus).not.toEqual(component.on, '#on should be change after #onclick()');
    });

    it('should #onclick() be called by click event', () => {
        const event = new MouseEvent('click', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        spyOn(component, 'onclick');
        toggle.dispatchEvent(event);
        expect(component.onclick).toHaveBeenCalled();
    });

    it('should #onclick() be called by keyup.enter event', () => {
        const event = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, shiftKey: false, key: 'Enter', code: 'Enter'
        });

        spyOn(component, 'onclick');
        toggle.dispatchEvent(event);
        expect(component.onclick).toHaveBeenCalled();
    });

    it('should #onclick() be immediately closed if #disabled is true', () => {
        spyOn(component, 'writeValue');
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.disabled = true;
        fixture.detectChanges();

        component.onclick();

        expect(component.writeValue).not.toHaveBeenCalled();
        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.onTouched).not.toHaveBeenCalled();
    });

    it('should #onclick() call #writeValue/#onCHange/#onTouched methods if #disabled is false', () => {
        spyOn(component, 'writeValue');
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.disabled = false;
        fixture.detectChanges();

        component.onclick();

        expect(component.writeValue).toHaveBeenCalled();
        expect(component.onChange).toHaveBeenCalled();
        expect(component.onTouched).toHaveBeenCalled();
    });
});
