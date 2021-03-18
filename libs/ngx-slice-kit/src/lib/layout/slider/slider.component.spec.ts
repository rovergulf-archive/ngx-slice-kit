import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
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
});
