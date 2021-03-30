import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideComponent } from './slide.component';
import {DebugElement} from '@angular/core';

describe('SlideComponent', () => {
    let component: SlideComponent;
    let fixture: ComponentFixture<SlideComponent>;
    let slideDe: DebugElement;
    let slideEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SlideComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SlideComponent);
        component = fixture.componentInstance;
        slideDe = fixture.debugElement;
        slideEl = slideDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should slide element has .sdk-slide class', () => {
        expect(slideEl).toHaveClass('sdk-slide');
    });
});
