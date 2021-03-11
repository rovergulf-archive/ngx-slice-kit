import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavMenuGroupComponent } from './nav-menu-group.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, DebugElement} from '@angular/core';
import {NavMenuItemComponent} from '../nav-menu-item/nav-menu-item.component';
import {IconComponent} from '../../../buttons/icon/icon.component';

describe('NavMenuGroupComponent', () => {
    let component: NavMenuGroupComponent;
    let fixture: ComponentFixture<TestComponent>;
    let navGroupDe: DebugElement;
    let navGroupEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [
                NavMenuGroupComponent,
                NavMenuItemComponent,
                TestComponent,
                IconComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
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

    it('should correct src set component active', () => {
        component.ngAfterContentInit();
        component.checkIsActive('/guides/fantastic');
        fixture.detectChanges();

        expect(component.isActive).toBeTrue();
        expect(component.isOpen).toBeTrue();
    });

    it('should invalid src set component inactive', () => {
        component.ngAfterContentInit();
        component.checkIsActive('/guides/doom');
        fixture.detectChanges();

        expect(component.isActive).toBeFalse();
        expect(component.isOpen).toBeFalse(); // because isOpen is false by default
    });

    it('should #deepLvl be equal 1 if it is not inner subgroup', () => {
        component.ngAfterContentInit();

        expect(component.deepLvl).toBe(1);
    });

    it('should .nav-menu-group__items has correct #deeplvl attribute', () => {
        const el: HTMLElement = navGroupEl.querySelector('.nav-menu-group__items');
        component.ngAfterContentInit();
        fixture.detectChanges();

        expect(el.getAttribute('deeplvl')).toEqual('1');
    });
});

@Component({
    selector: 'sdk-test-cmp',
    template: `
        <sdk-nav-menu-group>
            <a sdk-nav-menu-item routerLinkActive="active"
               routerLink="/guides/fantastic">Home page</a>
            <a sdk-nav-menu-item routerLinkActive="active"
               routerLink="/guides/invisible">Get started</a>
            <a sdk-nav-menu-item routerLinkActive="active" disabled="true"
               routerLink="/guides/torch">Style guide</a>
            <a sdk-nav-menu-item routerLinkActive="active" disabled="true"
               routerLink="/guides/thing">Schematics</a>
        </sdk-nav-menu-group>`,
})
class TestComponent {
}
