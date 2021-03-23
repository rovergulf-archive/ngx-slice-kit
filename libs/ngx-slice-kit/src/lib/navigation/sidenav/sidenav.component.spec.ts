import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SidenavComponent} from './sidenav.component';
import {DebugElement} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavService} from './sidenav.service';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let sidenavDe: DebugElement;
    let sidenavEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [SidenavComponent],
            providers: [SidenavService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        sidenavDe = fixture.debugElement;
        sidenavEl = sidenavDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #opened state set value to service #isOpened', () => {
        component.opened = true;
        fixture.detectChanges();
        expect(component.sidenavService.isOpened).toBeTrue();

        component.opened = false;
        fixture.detectChanges();
        expect(component.sidenavService.isOpened).toBeFalse();
    });

    it('should component has class sdk-sidenav--over if mode is "over"', () => {
        const mode = 'over';
        component.sidenavService.options.mode = mode;
        const expectedClass = `sdk-sidenav--${mode}`;
        fixture.detectChanges();

        expect(sidenavEl).toHaveClass(`sdk-sidenav--${mode}`);
        expect(component.currentMode).toBe(expectedClass);
    });

    it('should component has class sdk-sidenav--side if mode is "side"', () => {
        const mode = 'side';
        component.sidenavService.options.mode = mode;
        const expectedClass = `sdk-sidenav--${mode}`;
        fixture.detectChanges();

        expect(sidenavEl).toHaveClass(expectedClass);
        expect(component.currentMode).toBe(expectedClass);
    });

    it('should component has .active class if service #isOpened property is true', () => {
        component.sidenavService.isOpened = true;
        fixture.detectChanges();

        expect(sidenavEl).toHaveClass('active');
        expect(component.isOpened).toBeTrue();
    });

    it('should component has no .active class if service #isOpened property is true', () => {
        component.sidenavService.isOpened = false;
        fixture.detectChanges();

        expect(sidenavEl).not.toHaveClass('active');
        expect(component.isOpened).toBeFalse();
    });

    it('should component has styles from #styles property', () => {
        const testStyles = {
            width: '16px',
            border: '1px solid black'
        };
        component.styles = testStyles;
        fixture.detectChanges();

        expect(sidenavEl.style.border).toBe(testStyles.border);
        expect(sidenavEl.style.width).toBe(testStyles.width);

        const temp: any = component.getExternalStyles;

        expect(temp).toEqual(testStyles);
    });

    it('should component has no styles if #styles property is empty', () => {
        component.styles = undefined;
        expect(component.getExternalStyles).toEqual('');
    });

    it('should openClose return service open state "opened" or "closed"', () => {
        component.sidenavService.isOpened = true;
        fixture.detectChanges();
        expect(component.openClose).toBe('opened');

        component.sidenavService.isOpened = false;
        fixture.detectChanges();
        expect(component.openClose).toBe('closed');
    });

    it('should changing open state update options', () => {
        spyOn(component.sidenavService, 'updateOptions');
        component.ngAfterViewInit();

        component.sidenavService.isOpened = false;
        fixture.detectChanges();

        expect(component.sidenavService.updateOptions).toHaveBeenCalledWith({width: sidenavEl.clientWidth});
    });

    it('should component subscription be closed after component was destroyed', () => {
        component.ngAfterViewInit();
        component.ngOnDestroy();

        expect(component.sub.closed).toBeTrue();
    });
});
