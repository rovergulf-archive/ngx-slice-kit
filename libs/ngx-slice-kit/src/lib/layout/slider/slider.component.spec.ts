import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {SliderComponent} from './slider.component';
import {DebugElement} from '@angular/core';

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

    it('should wrapper element has class with --small modificator if #small is true', () => {
        component.small = true;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__wrapper');

        expect(el).toHaveClass('sdk-slider__wrapper--small');
    });

    it('should wrapper element has no class with --small modificator if #small is false', () => {
        component.small = false;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__wrapper');

        expect(el).not.toHaveClass('sdk-slider__wrapper--small');
    });

    it('should wrapper element has class with --multiple modificator if #multiple is true', () => {
        component.multiple = true;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__wrapper');

        expect(el).toHaveClass('sdk-slider__wrapper--multiple');
    });

    it('should wrapper element has no class with --multiple modificator if #multiple is false', () => {
        component.multiple = false;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__wrapper');

        expect(el).not.toHaveClass('sdk-slider__wrapper--multiple');
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

    it('should #thumb has correct coords after view was init', () => {
        component.multiple = false;
        component.ngOnInit();
        component.ngAfterViewInit();
        component.thumbSize = 32;
        const expCoords = component.getCoords(component.thumb.nativeElement.getBoundingClientRect().left + 32);

        expect(component.thumbCoords).toEqual(expCoords);
    });

    it('should #thumbCoords has correct value after view was init. #multiple = true;', () => {
        component.multiple = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        const expCoords = component.getCoords(component.thumbMultiple.nativeElement.getBoundingClientRect().left);

        expect(component.multiThumbCoords).toEqual(expCoords);
    });

    it('should #multiThumbCoords has correct value after view was init if #multiple = true;', () => {
        component.multiple = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        const expCoords = component.getCoords(component.thumbMultiple.nativeElement.getBoundingClientRect().left);

        expect(component.multiThumbCoords).toEqual(expCoords);
    });

    it('should #multiThumbCoords be undefined after view was init if #multiple = false;', () => {
        component.multiple = false;
        component.ngOnInit();
        component.ngAfterViewInit();

        expect(component.multiThumbCoords).toBeUndefined();
    });

    it('should #setInitialThumbCoords call #setGradient method', () => {
        spyOn(component, 'setGradient');
        component.multiple = false;
        component.min = 10;
        component.max = 50;
        component.value = 25;
        fixture.detectChanges();

        const expectedValue = (25 - 10) * 100 / (50 - 10);
        fixture.detectChanges();
        component.setInitialThumbCoords();

        expect(component.setGradient).toHaveBeenCalledWith(expectedValue);
    });

    it('should #trackRects be equal #track rects after #setInitialThumbCoords was called', () => {
        fixture.detectChanges();
        const expTracks = component.track.nativeElement.getBoundingClientRect();
        component.setInitialThumbCoords();
        fixture.detectChanges();

        expect(component.trackRects).toEqual(expTracks);
    });

    it('should #setInitialThumbCoords set #thumbCoords and left style for #thumb element', () => {
        component.multiple = false;
        component.min = 10;
        component.max = 50;
        component.value = 25;
        fixture.detectChanges();

        const expectedValue = (25 - 10) * 100 / (50 - 10);
        component.setInitialThumbCoords();
        fixture.detectChanges();

        expect(component.thumbCoords).toEqual(expectedValue);
        expect(component.thumb.nativeElement.style.left).toEqual(`${expectedValue}%`);
    });

    it('should #setInitialThumbCoords set #thumbCoords and left style for #thumb element. #multiple = true', () => {
        component.multiple = true;
        component.max = 50;
        component.min = 10;
        component.value = {min: 10, max: 50};
        fixture.detectChanges();

        const expectedValue = (50 - 10) * 100 / (50 - 10);
        component.setInitialThumbCoords();
        fixture.detectChanges();

        expect(component.thumbCoords).toEqual(expectedValue);
        expect(component.thumb.nativeElement.style.left).toEqual(`${expectedValue}%`);
    });

    it('should #setInitialThumbCoords set #multiThumbCoords and left style for #thumbMultiple element. #multiple = true', fakeAsync(() => {
        component.multiple = true;
        component.max = 50;
        component.min = 10;
        component.value = {min: 10, max: 50};
        fixture.detectChanges();

        const expectedValue = (10 - 10) * 100 / (50 - 10);
        component.setInitialThumbCoords();
        tick(1000);
        fixture.detectChanges();

        expect(component.multiThumbCoords).toEqual(expectedValue);
        expect(component.thumbMultiple.nativeElement.style.left).toEqual(`${expectedValue}%`);
    }));

    it('should #setValue overwrite #value if it does not equal & #multiple = false', () => {
        const newVal = 40;
        component.value = 50;
        fixture.detectChanges();

        component.setValue(newVal);
        expect(component.value).toEqual(newVal);
    });

    it('should #setValue emit #changed event with new value as argument if it does not equal to old value & #multiple = false', () => {
        component.value = 50;
        spyOn(component.changed, 'emit');
        fixture.detectChanges();

        component.setValue(20);
        expect(component.changed.emit).toHaveBeenCalledWith(20);
    });

    it('should #setValue do not emit #changed event if it equal to old value & #multiple = false', () => {
        component.value = 50;
        spyOn(component.changed, 'emit');
        fixture.detectChanges();

        component.setValue(component.value);
        expect(component.changed.emit).not.toHaveBeenCalled();
    });

    it('should #setValue(val, "max") overwrite #value.max if it does not equal & #multiple = true', () => {
        component.multiple = true;
        const newVal = 40;
        component.value = {min: 10, max: 50};
        fixture.detectChanges();

        component.setValue(newVal, 'max');
        expect(component.value.max).toEqual(newVal);
    });

    it('should #setValue(val, "max") emit #changed event with new value as argument if it does not equal to old value & #multiple = true',
        () => {
            component.multiple = true;
            component.value = {min: 10, max: 50};
            spyOn(component.changed, 'emit');
            fixture.detectChanges();

            component.setValue(40, 'max');
            expect(component.changed.emit).toHaveBeenCalledWith({min: 10, max: 40});
        });

    it('should #setValue(val, "max") do not emit #changed event if it equal to old value & #multiple = true', () => {
        component.value = {min: 10, max: 50};
        spyOn(component.changed, 'emit');
        fixture.detectChanges();

        component.setValue(component.value, 'min');
        expect(component.changed.emit).not.toHaveBeenCalled();
    });

    it('should #setValue(val, "min") overwrite #value.max if it does not equal & #multiple = true', () => {
        component.multiple = true;
        const newVal = 40;
        component.value = {min: 10, max: 50};
        fixture.detectChanges();

        component.setValue(newVal, 'min');
        expect(component.value.min).toEqual(newVal);
    });

    it('should #setValue(val, "min") emit #changed event with new value as argument if it does not equal to old value & #multiple = true',
        () => {
            component.multiple = true;
            component.value = {min: 10, max: 50};
            spyOn(component.changed, 'emit');
            fixture.detectChanges();

            component.setValue(40, 'min');
            expect(component.changed.emit).toHaveBeenCalledWith({min: 40, max: 50});
        });

    it('should #setValue(val, "min") do not emit #changed event if it equal to old value & #multiple = true', () => {
        component.value = {min: 10, max: 50};
        spyOn(component.changed, 'emit');
        fixture.detectChanges();

        component.setValue(component.value, 'min');
        expect(component.changed.emit).not.toHaveBeenCalled();
    });

    it('should #calcValue set #interValue call #setValue with new value and same rangeSide', () => {
        spyOn(component, 'setValue');
        const range = 'min';
        const diff = 100;
        const coords = 50;
        const expectVal = Math.round(diff / 100 * coords);
        const newVal = expectVal; // component.step * Math.ceil(component.interValue / component.step) + component.min

        component.calcValue(coords, range);
        expect(component.setValue).toHaveBeenCalledWith(newVal, range);
    });

    it('should #calcValue set #interValue', () => {
        const diff = 100;
        const coords = 50;
        const expectVal = Math.round(diff / 100 * coords);

        component.calcValue(coords);
        expect(component.interValue).toEqual(expectVal);
    });

    it('should #setGradient(coords, left: false) set #gradientSize equal coords arg', () => {
        const coords = 10;
        component.setGradient(coords, false);

        expect(component.gradientLeftOffset).toBeUndefined(coords);
        expect(component.gradientSize).toEqual(coords);
    });

    it('should #setGradient(coords, left: true) set #gradientLeftOffset equal coords arg', () => {
        const coords = 10;
        component.setGradient(coords, true);

        expect(component.gradientLeftOffset).toEqual(coords);
        expect(component.gradientSize).toBeUndefined();
    });

    it('should #drop method set #isDrag & #isMultipleDrag as false', () => {
        component.isDrag = false;
        component.isMultipleDrag = false;
        fixture.detectChanges();

        component.drop();

        expect(component.isDrag).toBeFalse();
        expect(component.isMultipleDrag).toBeFalse();
    });

    it('should #pointerup event on document trigger #drop method', () => {
        spyOn(component, 'drop');
        const event = new PointerEvent('pointerup');

        document.dispatchEvent(event);

        expect(component.drop).toHaveBeenCalled();

    });

    it('should click on thumb element call #grab method', () => {
        const event = new PointerEvent('pointerdown');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper .sdk-slider__thumb');
        spyOn(component, 'grab');

        el.dispatchEvent(event);
        expect(component.grab).toHaveBeenCalledWith('isDrag', event);
    });

    it('should click on thumbMultiple element call #grab method', () => {
        const event = new PointerEvent('pointerdown');
        component.multiple = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper--multiple .sdk-slider__thumb');
        spyOn(component, 'grab');

        el.dispatchEvent(event);
        expect(component.grab).toHaveBeenCalledWith('isMultipleDrag', event);
    });

    it('should #drag("isDrag") set set property from prop argument as true', () => {
        const event = new PointerEvent('pointerdown');
        component.grab('isDrag', event);

        expect(component.isDrag).toEqual(true);
        expect(component.isMultipleDrag).toEqual(false);
    });

    it('should #drag("isMultipleDrag") set set property from prop argument as true', () => {
        const event = new PointerEvent('pointerdown');
        component.grab('isMultipleDrag', event);

        expect(component.isDrag).toEqual(false);
        expect(component.isMultipleDrag).toEqual(true);
    });

    it('should #grab with "isMultipleDrag" as prop argument set #multiThumbClickOffset from event.layerX value', () => {
        const event = {layerX: 10};
        component.grab('isMultipleDrag', event);

        expect(component.multiThumbClickOffset).toEqual(event.layerX);
    });

    it('should #grab with "isDrag" as prop argument set #thumbClickOffset from event.layerX value', () => {
        const event = {layerX: 10};
        component.grab('isDrag', event);

        expect(component.thumbClickOffset).toEqual(event.layerX);
    });

    it('should #getCoords call #setValue method with #min as argument if mouseX prop is less than #track left rect', () => {
        spyOn(component, 'setValue');
        const dArg = -10;

        component.getCoords(dArg);
        expect(component.setValue).toHaveBeenCalledWith(component.min);
    });

    it('should #getCoords call #setValue method with #max as argument if mouseX prop is greater than #track right rect', () => {
        spyOn(component, 'setValue');
        const dArg = 64000;

        component.getCoords(dArg);
        expect(component.setValue).toHaveBeenCalledWith(component.max);
    });

    it('should #getCoords return correct coords. Argument less then track left rect', () => {
        const dArg = -10;
        const dRects = component.track.nativeElement.getBoundingClientRect();

        expect(component.getCoords(dArg)).toEqual(0); // (dRects.left - dRects.left) / dRects.width * 100;
    });

    it('should #getCoords return correct coords. Argument greater then track left right', () => {
        const dArg = 64000;
        const dRects = component.track.nativeElement.getBoundingClientRect();

        expect(component.getCoords(dArg)).toEqual(100); // (dRects.right - dRects.left) / dRects.width * 100;s
    });

    it('should #moveThumb be called by #pointerdown event on track-wrapper element', () => {
        fixture.detectChanges();
        spyOn(component, 'moveThumb');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper');
        const event = new PointerEvent('pointerdown');
        el.dispatchEvent(event);

        expect(component.moveThumb).toHaveBeenCalled();
    });

    it('should no be multiple element if #multiple is false', () => {
        component.multiple = false;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper--multiple');

        expect(el).toBeNull();
        expect(component.thumbMultiple).toBeUndefined();
    });

    it('should be multiple element if #multiple is true', () => {
        component.multiple = true;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper--multiple');

        expect(el).toBeTruthy();
        expect(component.thumbMultiple).not.toBeUndefined();
    });

    it('should multythumb has class with --active modificator if #isMultipleDrag is true', () => {
        component.multiple = true;
        component.isMultipleDrag = true;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper--multiple .sdk-slider__thumb');

        expect(el).toHaveClass('sdk-slider__thumb--active');
    });

    it('should multythumb has no class with --active modificator if #isMultipleDrag is false', () => {
        component.multiple = true;
        component.isMultipleDrag = false;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb-wrapper--multiple .sdk-slider__thumb');

        expect(el).not.toHaveClass('sdk-slider__thumb--active');
    });

    it('should thumb has class with --active modificator if #isDrag is true', () => {
        component.isDrag = true;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper .sdk-slider__thumb');

        expect(el).toHaveClass('sdk-slider__thumb--active');
    });

    it('should thumb has no class with --active modificator if #isDrag is false', () => {
        component.isDrag = false;
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper .sdk-slider__thumb');

        expect(el).not.toHaveClass('sdk-slider__thumb--active');
    });

    it('should .sdk-slider-track__padding has size equal #thumbSize', () => {
        fixture.detectChanges();
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider-track__padding');

        expect(el.style.width).toEqual('32px');
    });

    it('should pointermove event trigger #pointerMove handler', () => {
        spyOn(component, 'pointerMove');
        const event = new PointerEvent('pointermove');

        document.dispatchEvent(event);
        expect(component.pointerMove).toHaveBeenCalledWith(event);
    });

    it('should #pointerMove correctly set #thumbCoords if #isDrug', () => {
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.isDrag = true;
        component.isMultipleDrag = false;
        component.thumbClickOffset = 10;
        fixture.detectChanges();
        component.pointerMove(event);
        expect(component.thumbCoords).toEqual(component.getCoords(event.clientX - 10));
        expect(component.thumb.nativeElement.style.left).toEqual(`${component.thumbCoords}%`);
    });

    it('should #movePointer call #setGradient with #thumbsCoords if #isDrag', () => {
        spyOn(component, 'setGradient');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.isDrag = true;
        component.pointerMove(event);

        expect(component.setGradient).toHaveBeenCalledWith(component.thumbCoords);
    });

    it('should #movePointer call #calcValue with #thumbsCoords if #isDrag', () => {
        spyOn(component, 'calcValue');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.isDrag = true;
        component.pointerMove(event);

        expect(component.calcValue).toHaveBeenCalledWith(component.thumbCoords, null);
    });

    it('should #movePointer #movePointer emit #moved event if #isDrag', () => {
        spyOn(component.moved, 'emit');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.isDrag = true;
        component.pointerMove(event);

        expect(component.moved.emit).toHaveBeenCalled();
    });

    it('should #pointerMove correctly set #multiThumbCoords if #isMultipleDrugisMultipleDrag', () => {
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.isDrag = false;
        component.multiple = true;
        component.isMultipleDrag = true;
        component.multiThumbClickOffset = 10;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        component.pointerMove(event);
        expect(component.multiThumbCoords).toEqual(component.getCoords(event.clientX - 10));
        expect(component.thumbMultiple.nativeElement.style.left).toEqual(`${component.multiThumbCoords}%`);
    });

    it('should #movePointer call #setGradient with #multiThumbCoords if #isMultipleDrag', () => {
        spyOn(component, 'setGradient');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.multiple = true;
        component.isMultipleDrag = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        component.pointerMove(event);

        expect(component.setGradient).toHaveBeenCalledWith(component.multiThumbCoords, true);
    });

    it('should #movePointer call #calcValue with #multiThumbCoords if #isMultipleDrag', () => {
        spyOn(component, 'calcValue');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.multiple = true;
        component.isMultipleDrag = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        component.pointerMove(event);

        expect(component.calcValue).toHaveBeenCalledWith(component.multiThumbCoords, 'min');
    });

    it('should #movePointer #movePointer emit #moved event if #isMultipleDrag', () => {
        spyOn(component.moved, 'emit');
        const event = new PointerEvent('pointermove', {clientX: 10});
        component.multiple = true;
        component.isMultipleDrag = true;
        fixture.detectChanges();
        component.ngOnInit();
        component.ngAfterViewInit();
        component.pointerMove(event);

        expect(component.moved.emit).toHaveBeenCalled();
    });

    it('should #moveThumb emit #moved event if click was on track', () => {
        spyOn(component.moved, 'emit');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper');
        const event = new PointerEvent('pointerdown');
        el.dispatchEvent(event);
        expect(component.moved.emit).toHaveBeenCalled();
    });

    it('should #moveThumb do not emit #moved event if click was on thumb', () => {
        spyOn(component.moved, 'emit');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__thumb');
        const event = new PointerEvent('pointerdown');
        el.dispatchEvent(event);
        expect(component.moved.emit).not.toHaveBeenCalled();
        expect(component.moveThumb(event)).toBeUndefined();
    });

    it('should #moveThumb call #setGradient method', () => {
        spyOn(component, 'setGradient');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper');
        const event = new PointerEvent('pointerdown', {clientX: 10});
        el.dispatchEvent(event);

        expect(component.setGradient).toHaveBeenCalledWith(component.getCoords(10));
    });

    it('should #moveThumb call #calcValue method', () => {
        spyOn(component, 'calcValue');
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper');
        const event = new PointerEvent('pointerdown', {clientX: 10});
        el.dispatchEvent(event);

        expect(component.calcValue).toHaveBeenCalledWith(component.getCoords(10));
    });

    it('should #moveThumb call #calcValue & #setGradient methods. #multiple = true', () => {
        spyOn(component, 'setGradient');
        spyOn(component, 'calcValue');
        component.multiple = true;
        const el: HTMLElement = sliderEl.querySelector('.sdk-slider__track-wrapper');
        const event = new PointerEvent('pointerdown', {clientX: 10});
        el.dispatchEvent(event);

        expect(component.setGradient).toHaveBeenCalled();
        expect(component.calcValue).toHaveBeenCalled();
    });

    it('should', () => {

    });
});
