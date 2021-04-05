import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
    let component: RadioComponent;
    let fixture: ComponentFixture<RadioComponent>;
    let radio: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RadioComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioComponent);
        component = fixture.componentInstance;
        radio = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disabled property work correctly', () => {
        component.disabled = true;
        fixture.detectChanges();
        expect(radio.classList.contains('disabled')).toBe(true, 'if "disabled" property set as "true"');

        component.disabled = false;
        fixture.detectChanges();
        expect(radio.classList.contains('disabled')).toBe(false, 'if "disabled" property set as "false"');
    });

    it('should radio parameters be equal the number of data items', () => {
        component.data = [
            {value: 1, name: 'Chiki'},
            {value: 2, name: 'Briki1'},
            {value: 3, name: 'Briki2'},
            {value: 4, name: 'Briki3'},
            {value: 5, name: 'Briki4'},
        ];
        fixture.detectChanges();

        expect(radio.querySelectorAll('.sdk-radio__radio').length).toEqual(5);
    });

    it('should radio label be equal data item name', () => {
        component.data = [{value: 1, name: 'First data item name'}];
        fixture.detectChanges();

        expect(radio.querySelector('.sdk-radio__radio').textContent.trim()).toEqual('First data item name');
    });

    it('should tabindex property set correct attribute', () => {
        component.data = [{value: 1, name: 'value'}];
        component.tabindex = 3;

        fixture.detectChanges();

        expect(radio.querySelector('.sdk-radio__radio').getAttribute('tabindex')).toEqual('3');
    });

    it('should #select() set valid value', () => {
        component.data = [{value: 1, name: 'A'}, {value: 2, name: 'B'}];

        fixture.detectChanges();
        component.select(2);
        expect(component.value).toEqual(2, 'now value set as "2"');

        fixture.detectChanges();
        component.select(1);
        expect(component.value).toEqual(1, 'now value set as "1"');
    });

    // it('should the state be small if property "small" set as "true"', () => {
    //     component.data = [{value: 1, name: 'A'}, {value: 2, name: 'B'}];
    //     component.small = true;
    //     const smallSize = 16;
    //
    //     fixture.detectChanges();
    //
    //     expect(radio.querySelector('.sdk-radio__container--small')).toBeTruthy();
    //     expect(radio.querySelector('.sdk-radio__indicator').clientHeight).toEqual(smallSize);
    //     expect(radio.querySelector('.sdk-radio__indicator').clientWidth).toEqual(smallSize);
    // });

    it('should #click() correctly change radio inputs', () => {
        component.data = [{value: 1, name: 'A'}, {value: 2, name: 'B'}];

        fixture.detectChanges();

        const radioButtons = radio.querySelectorAll('.sdk-radio__radio');
        const firstButton: HTMLElement = radioButtons[0] as HTMLElement;
        const secondButton: HTMLElement = radioButtons[1] as HTMLElement;

        firstButton.click();
        fixture.detectChanges();

        expect(firstButton.querySelector('.sdk-radio__indicator--selected')).toBeTruthy();
        expect(secondButton.querySelector('.sdk-radio__indicator--selected')).not.toBeTruthy();
        expect(component.value).toEqual(1);

        secondButton.click();
        fixture.detectChanges();

        expect(secondButton.querySelector('.sdk-radio__indicator--selected')).toBeTruthy();
        expect(firstButton.querySelector('.sdk-radio__indicator--selected')).not.toBeTruthy();
        expect(component.value).toEqual(2);
    });

    it('should the error line was displayed', () => {
        component.data = [{value: 1, name: 'A'}, {value: 2, name: 'B'}];
        const errorText = 'Some error';

        fixture.detectChanges();

        expect(radio.classList.contains('sdk-input--warn')).not.toBeTruthy();
        expect(radio.querySelector('.sdk-radio__error')).not.toBeTruthy();

        component.error = errorText;
        fixture.detectChanges();

        expect(radio.classList.contains('sdk-input--warn')).toBeTruthy();
        expect(radio.querySelector('.sdk-radio__error')).toBeTruthy();
        expect(radio.querySelector('.sdk-radio__error').textContent.trim()).toEqual(errorText);
    });
});
