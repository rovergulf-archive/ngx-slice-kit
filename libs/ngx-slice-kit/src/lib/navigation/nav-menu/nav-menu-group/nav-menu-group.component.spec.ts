import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavMenuGroupComponent } from './nav-menu-group.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';

describe('NavMenuGroupComponent', () => {
    let component: NavMenuGroupComponent;
    let fixture: ComponentFixture<NavMenuGroupComponent>;
    let navGroupDe: DebugElement;
    let navGroupEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [NavMenuGroupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavMenuGroupComponent);
        component = fixture.componentInstance;
        navGroupDe = fixture.debugElement;
        navGroupEl = navGroupDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #toggle() change #isOpenp property', () => {
       component.isOpen = false;
       fixture.detectChanges();

       component.toggle();
       expect(component.isOpen).toBeTrue();
       component.toggle();
       fixture.detectChanges();
       expect(component.isOpen).toBeFalse();
    });

    it('should main container has .open class if component property #isOpen is true', () => {
       const container: HTMLElement = navGroupEl.querySelector('.nav-menu-group__container');
       component.isOpen = true;
       fixture.detectChanges();

       expect(container.classList.contains('open')).toBeTrue();
    });

    it('should main container has .active class if component property #isActive is true', () => {
        const container: HTMLElement = navGroupEl.querySelector('.nav-menu-group__container');
        component.isActive = true;
        fixture.detectChanges();

        expect(container.classList.contains('active')).toBeTrue();
    });

    it('should component correctly render label', () => {
        const titleEl: HTMLElement = navGroupEl.querySelector('.nav-menu-group__title');
        const label = 'test label';
        component.label = label;

        fixture.detectChanges();
        expect(titleEl.textContent).toBe(label);
    });
});
