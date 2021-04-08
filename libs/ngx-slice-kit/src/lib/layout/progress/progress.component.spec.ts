import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { ProgressComponent } from './progress.component';
import {DebugElement} from '@angular/core';

describe('ProgressComponent', () => {
    let component: ProgressComponent;
    let fixture: ComponentFixture<ProgressComponent>;
    let progressDe: DebugElement;
    let progressEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressComponent);
        component = fixture.componentInstance;
        progressDe = fixture.debugElement;
        progressEl = progressDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #val be equal 0 by default', () => {
        expect(component.val).toEqual(0);
    });

    it('should should element has no .progressbar--small class because #small is false by default', () => {
        const el: HTMLElement = progressEl.querySelector('.sdk-progressbar');

        expect(el).not.toHaveClass('progressbar--small');
    });

    it('should should element has progressbar--small class if #small is true', () => {
        component.small = true;
        fixture.detectChanges();
        const el: HTMLElement = progressEl.querySelector('.sdk-progressbar');

        expect(el).toHaveClass('progressbar--small');
    });

    it('should #max be equal 100 by default', () => {
        expect(component.max).toEqual(100);
    });

    it('should #min be equal 0 by default', () => {
        expect(component.min).toEqual(0);
    });

    it('should be emit #progressEnd event if value is 100', fakeAsync(() => {
        spyOn(component.progressEnd, 'emit');
        component.value = 100;

        tick(600);
        expect(component.progressEnd.emit).toHaveBeenCalled();
    }));

    it('should be width of inner progress bar be equal #val in %', () => {
        component.value = 100;
        const el: HTMLElement = progressEl.querySelector('.progressbar__fill');
        fixture.detectChanges();

        expect(el.style.width).toEqual('100%');

        component.value = 15;
        fixture.detectChanges();
        expect(el.style.width).toEqual('15%');
    });

    it('should #value getter works correctly', () => {
        component.value = 50;
        fixture.detectChanges();

        expect(component.value).toEqual(50);
    });

    it('should #value be equal 0 if it get value less then #min', () => {
        component.value = -50;
        fixture.detectChanges();
        expect(component.value).toEqual(0);
    });

    it('should #value be equal 100 if it get value greater then #max', () => {
        component.value = 100;
        fixture.detectChanges();
        expect(component.value).toEqual(100);
    });

    it('should #value has correct value in % if it get value between #min and #max', () => {
        component.value = 20;
        fixture.detectChanges();
        expect(component.value).toEqual(20);
    });

    it('should #value be equal #max if #value > #max', () => {
        component.max = 100;
        component.value = 200;

        expect(component.value).toEqual(100);
    });
});
