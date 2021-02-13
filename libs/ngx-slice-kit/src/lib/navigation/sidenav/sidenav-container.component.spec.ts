import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SidenavContainerComponent} from './sidenav-container.component';
import {SidenavService} from './sidenav.service';
import {DebugElement} from '@angular/core';

describe('SidenavContainerComponent', () => {
    let component: SidenavContainerComponent;
    let fixture: ComponentFixture<SidenavContainerComponent>;
    let sidenavContainerDe: DebugElement;
    let sidenavContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavContainerComponent],
            providers: [SidenavService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContainerComponent);
        component = fixture.componentInstance;
        sidenavContainerDe = fixture.debugElement;
        sidenavContainerEl = sidenavContainerDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should backdrop element has no .active class if #hasBackdrop property is false', () => {
        const backdropEl: HTMLElement = sidenavContainerEl.querySelector('.sdk-sidenav-backdrop');
        component.sidenavService.isOpened = true;
        component.hasBackdrop = false;
        fixture.detectChanges();

        expect(backdropEl).not.toHaveClass('active');
    });

    it('should backdrop element has no .active class if #sidenavService.isOpen property is false', () => {
        const backdropEl: HTMLElement = sidenavContainerEl.querySelector('.sdk-sidenav-backdrop');
        component.hasBackdrop = true;
        component.sidenavService.isOpened = false;
        fixture.detectChanges();

        expect(backdropEl).not.toHaveClass('active');
    });

    it('should backdrop element has .active class if #sidenavService.isOpen property and #hasBackdrop are true', () => {
        const backdropEl: HTMLElement = sidenavContainerEl.querySelector('.sdk-sidenav-backdrop');
        component.sidenavService.isOpened = true;
        component.hasBackdrop = true;
        fixture.detectChanges();

        expect(backdropEl).toHaveClass('active');
    });

    it('should click on backdrop element call #closeSide handler', () => {
        const backdropEl: HTMLElement = sidenavContainerEl.querySelector('.sdk-sidenav-backdrop');
        spyOn(component, 'closeSide');

        backdropEl.click();
        expect(component.closeSide).toHaveBeenCalled();
    });

    it('should #hasBackdrop be false by default', () => {
        expect(component.hasBackdrop).toBeFalse();
    });

    it('should #closeSide() set sidenavService.isOpened as false', () => {
        component.sidenavService.isOpened = true;
        component.closeSide();

        expect(component.sidenavService.isOpened).toBeFalse();
    });

    it('should #mode changing change sidenavService.options.mode property', () => {
        const mode = 'over';
        component.mode = mode;

        expect(component.sidenavService.options.mode).toBe(mode);
    });

    it('should sidenavService.options.mode property has component #mode value after ngOnInit event', () => {
        const mode = 'over';
        component.mode = mode;
        component.ngOnInit();

        expect(component.sidenavService.options.mode).toBe(mode);
    });
});
