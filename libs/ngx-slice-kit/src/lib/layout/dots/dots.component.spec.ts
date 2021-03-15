import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { DotsComponent } from './dots.component';
import {DebugElement} from '@angular/core';

describe('DotsComponent', () => {
    let component: DotsComponent;
    let fixture: ComponentFixture<DotsComponent>;
    let dotsDe: DebugElement;
    let dotsEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DotsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DotsComponent);
        component = fixture.componentInstance;
        dotsDe = fixture.debugElement;
        dotsEl = dotsDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #dots arr have length equal #count property after component was init', fakeAsync(() => {
        const t = 4;
        component.count = t;
        component.ngOnInit();

        expect(component.dots.length).toEqual(t);
    }));

    it('should count of dot elements in template be equal #count', fakeAsync(() => {
        const t = 4;
        component.count = t;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        let els = dotsEl.querySelectorAll('.sdk-dots__dot');

        expect(els.length).toEqual(t);

        component.count = 6;
        component.ngOnChanges(6);
        fixture.detectChanges();
        els = dotsEl.querySelectorAll('.sdk-dots__dot');
        expect(els.length).toEqual(6);
    }));

    it('should element has no .sdk-dots--small if #small is false / by default', () => {
        const el: HTMLElement = dotsEl.querySelector('.sdk-dots');
        expect(el).not.toHaveClass('sdk-dots--small');
    });
    it('should element has .sdk-dots--small if #small is true', () => {
        component.small = true;
        fixture.detectChanges();
        const el: HTMLElement = dotsEl.querySelector('.sdk-dots');
        expect(el).toHaveClass('sdk-dots--small');
    });

    it('should click on dot element trigger #clickHandler', () => {
        spyOn(component, 'clickHandler');
        component.count = 4;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        const el: HTMLElement = dotsEl.querySelectorAll('.sdk-dots__dot')[1] as HTMLElement; // second dot

        el.click();

        expect(component.clickHandler).toHaveBeenCalledWith(1); // because second dot
    });

    it('should #clickHandler emit #selected event', () => {
        spyOn(component.selected, 'emit');
        component.count = 4;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        const el: HTMLElement = dotsEl.querySelector('.sdk-dots__dot'); // first dot

        el.click();

        expect(component.selected.emit).toHaveBeenCalledWith(0); // emit first dot index
    });

    it('should #clickHandler change #activeIndex', () => {
        component.clickHandler(5);
        expect(component.activeIndex).toEqual(5);
    });
});
