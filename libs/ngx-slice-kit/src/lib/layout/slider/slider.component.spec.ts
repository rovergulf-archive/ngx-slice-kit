import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import {DebugElement, Input} from '@angular/core';

describe('SliderComponent', () => {
    let component: SliderComponent;
    let fixture: ComponentFixture<SliderComponent>;
    let sliderDe: DebugElement;
    let sliderEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SliderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderComponent);
        component = fixture.componentInstance;
        sliderDe = fixture.debugElement;
        sliderEl = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default values be correct', () => {
        expect(component.max).toEqual(100);
        expect(component.min).toEqual(0);
        expect(component.step).toEqual(1);
        expect(component.color).toEqual('var(--primary)');
        expect(component.disabled).toEqual(false);
        expect(component.multiple).toEqual(false);
        expect(component.small).toEqual(false);
        expect(component.isDrag).toEqual(false);
        expect(component.interValue).toEqual(0);
        expect(component.max).toEqual(100);
    });

    it('should #thumbSize be equal 32 if component is not multiple and not small', () => {
        component.multiple = false;
        component.small = false;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.thumbSize).toEqual(32);
    });

    it('should #thumbSize be equal 24 if component is not multiple and small', () => {
        component.multiple = false;
        component.small = true;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.thumbSize).toEqual(24);
    });

    it('should #thumbSize be equal 12 if component is multiple', () => {
        component.multiple = true;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.thumbSize).toEqual(12);
    });

    it('should switch min and max values if #min is greater then #max after component was init', () => {
        component.min = 50;
        component.max = 10;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.max).toEqual(50);
        expect(component.min).toEqual(10);
    });

    it('should value be equal #max after component was init, if input value was greater', () => {
        component.multiple = false;
        component.max = 100;
        component.value = 150;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual(100);
    });

    it('should value be equal #min after component was init, if input value was less', () => {
        component.multiple = false;
        component.min = 10;
        component.value = 5;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual(10);
    });

    it('should multiple #value.max be equal #min after component was init, if input value was greater', () => {
        component.multiple = true;
        component.max = 50;
        component.value = {min: 10, max: 100};
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value.max).toEqual(50);
    });

    it('should multiple #value.min be equal #min after component was init, if input value was less', () => {
        component.multiple = true;
        component.min = 0;
        component.value = {min: 10, max: 100};
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value.min).toEqual(10);
    });

    it('should component has correct value after was init with #multiple prop as false', () => {
        component.multiple = false;
        component.value = 55;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual(55);
    });

    it('should component has correct value after was init with #multiple prop as true', () => {
        component.multiple = true;
        component.max = 100;
        component.min = 0;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual({min: 0, max: 100});
    });

    it('should #value be equal #min after component was init if it was not be input and #multiple is false', () => {
        component.multiple = false;
        component.max = 10;
        component.min = 1;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual(1);
    });

    it('should #value be equal {min: #min, max: #max} after component was init if it was not be input and #multiple is true', () => {
        component.multiple = true;
        component.max = 10;
        component.min = 1;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.value).toEqual({min: 1, max: 10});
    });

    it('should be called #setInitialThumbCoords method after component was init, if #value exists and is not equal #min', () => {
        spyOn(component, 'setInitialThumbCoords');
        component.value = 5;
        component.min = 0;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.setInitialThumbCoords).toHaveBeenCalled();
    });

    it('should be not called #setInitialThumbCoords method after component was init, if #value exists and equal #min', () => {
        spyOn(component, 'setInitialThumbCoords');
        component.value = 5;
        component.min = 5;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.setInitialThumbCoords).not.toHaveBeenCalled();
    });

    it('should be not called #setInitialThumbCoords method after component was init, if #value does not exist', () => {
        spyOn(component, 'setInitialThumbCoords');
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.setInitialThumbCoords).not.toHaveBeenCalled();
    });

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

});
