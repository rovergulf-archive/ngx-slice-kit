import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NavTabsComponent} from './nav-tabs.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, DebugElement, ElementRef, ViewChild} from '@angular/core';
import {TabLinkDirective} from './tab-link.directive';
import {DemoPageOneComponent} from '../../../../../../src/app/docs/navigation/demos/page-one/page-one.component';
import {DemoPageTwoComponent} from '../../../../../../src/app/docs/navigation/demos/page-two/page-two.component';
import {DemoPageThreeComponent} from '../../../../../../src/app/docs/navigation/demos/page-three/page-three.component';
import {DemoPageFourComponent} from '../../../../../../src/app/docs/navigation/demos/page-four/page-four.component';
import {DemoPageFiveComponent} from '../../../../../../src/app/docs/navigation/demos/page-five/page-five.component';
import {Router, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'demo-first', pathMatch: 'full'},
    {path: 'demo-first', component: DemoPageOneComponent, data: {index: 1}},
    {path: 'demo-second', component: DemoPageTwoComponent, data: {index: 2}},
    {path: 'demo-third', component: DemoPageThreeComponent, data: {index: 3}},
    {path: 'demo-fourth', component: DemoPageFourComponent, data: {index: 4}},
    {path: 'demo-fifth', component: DemoPageFiveComponent, data: {index: 5}},
    {path: 'demo-sixth', component: DemoPageOneComponent, data: {index: 6}},
    {path: 'demo-seventh', component: DemoPageTwoComponent, data: {index: 7}},
    {path: 'demo-eighth', component: DemoPageThreeComponent, data: {index: 8}},
];

describe('NavTabsComponent', () => {
    let component: NavTabsComponent;
    let fixture: ComponentFixture<TestComponent>;
    let navTabsDe: DebugElement;
    let navTabsEl: HTMLElement;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                BrowserAnimationsModule
            ],
            declarations: [
                NavTabsComponent,
                TestComponent,
                TabLinkDirective,
                DemoPageOneComponent,
                DemoPageTwoComponent,
                DemoPageThreeComponent,
                DemoPageFourComponent,
                DemoPageFiveComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        navTabsDe = fixture.debugElement;
        navTabsEl = navTabsDe.children[0].nativeElement;
        router = TestBed.inject(Router);
        router.navigate(['']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should animation has correct value', () => {
        expect(component.animation).toBeFalse(); // by default;
        component.animation = true;
        fixture.detectChanges();
        expect(component.animation).toBeTrue();
        component.animation = false;
        fixture.detectChanges();
        expect(component.animation).toBeFalse();
    });

    it('should tabs has .sdk-tab-container__tab--fill class if #activeTabStyle = "fill"', () => {
        const el = navTabsEl.querySelector('.sdk-tab-container__tab');
        component.activeTabStyle = 'fill';
        fixture.detectChanges();
        expect(el).toHaveClass('sdk-tab-container__tab--fill');
    });

    it('should be no .slide element inside tabs container if #activeTabStyle = "fill"', () => {
        component.activeTabStyle = 'fill';
        fixture.detectChanges();
        const el = navTabsEl.querySelector('.slide');
        expect(el).toBeFalsy();
    });

    it('should tabs has no .sdk-tab-container__tab--fill class if #activeTabStyle = "border"', () => {
        const el = navTabsEl.querySelector('.sdk-tab-container__tab');
        component.activeTabStyle = 'border';
        fixture.detectChanges();
        expect(el).not.toHaveClass('sdk-tab-container__tab--fill');
    });

    it('should be .slide element inside tabs container if #activeTabStyle = "border"', () => {
        component.activeTabStyle = 'border';
        fixture.detectChanges();
        const el = navTabsEl.querySelector('.slide');
        expect(el).toBeTruthy();
    });

    it('should linkTabs length be equal count of #sdkTabLink\'s inside nav-tabs component', () => {
        const linksCount = new TestComponent().links.length;
        expect(component.linkTabs.length).toEqual(linksCount);
    });
});

@Component({
    selector: 'sdk-test-cmp',
    template: `
        <sdk-nav-tab-group>
            <a sdkTabLink *ngFor="let link of links"
               [disabled]="link.disabled"
               [routerLinkActive]="'sdk-tab-container__tab--active'"
               #rla="routerLinkActive"
               [routerLink]="link.src"
               [label]="link.label"
               [active]="rla.isActive"></a>
        </sdk-nav-tab-group>`,
})
class TestComponent {
    links = [
        {src: 'demo-first', label: 'First tab'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: true},
        {src: 'demo-third', label: 'Randomly name so long and im no tired'},
        {src: 'demo-fourth', label: 'Why do we should put the long titles'},
        {src: 'demo-fifth', label: 'Tab tab tab tab tab tab tab3 long'},
        {src: 'demo-sixth', label: 'Tab tab tab tab tab tab tab4 long', disabled: true},
        {src: 'demo-seventh', label: 'Tab tab tab tab tab tab tab5 long'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];
}
