import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NavMenuComponent} from './nav-menu.component';
import {Component, DebugElement} from '@angular/core';
import {NavMenuGroupComponent} from './nav-menu-group/nav-menu-group.component';
import {NavMenuItemComponent} from './nav-menu-item/nav-menu-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('NavMenuComponent', () => {
    let component: NavMenuComponent;
    let fixture: ComponentFixture<TestComponent>;
    let navMenuDe: DebugElement;
    let navMenuEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [
                TestComponent,
                NavMenuComponent,
                NavMenuGroupComponent,
                NavMenuItemComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        navMenuDe = fixture.debugElement;
        navMenuEl = navMenuDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should nav-menu #menuItems has length equal to count nav-menu-item elements', () => {
        component.ngAfterContentInit();
        const items = navMenuEl.querySelectorAll('a[sdk-nav-menu-item]');
        expect(component.menuItems.length).toBe(4);
        expect(items.length).toBe(4);
    });
});

@Component({
    selector: 'sdk-test-cmp',
    template: `
        <sdk-nav-menu>
            <a sdk-nav-menu-item routerLinkActive="active"
               routerLink="/guides/home">Home page</a>
            <a sdk-nav-menu-item routerLinkActive="active"
               routerLink="/guides/get-started">Get started</a>
            <a sdk-nav-menu-item routerLinkActive="active" disabled="true"
               routerLink="/guides/style-guide">Style guide</a>
            <a sdk-nav-menu-item routerLinkActive="active" disabled="true"
               routerLink="/guides/schematics">Schematics</a>
        </sdk-nav-menu>`,
})
class TestComponent {
}
