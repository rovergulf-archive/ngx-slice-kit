import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {NavTabsComponent} from './nav-tabs.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {TabLinkDirective} from './tab-link.directive';
import {DemoPageOneComponent} from '../../../../../../src/app/docs/navigation/demos/page-one/page-one.component';
import {DemoPageTwoComponent} from '../../../../../../src/app/docs/navigation/demos/page-two/page-two.component';
import {DemoPageThreeComponent} from '../../../../../../src/app/docs/navigation/demos/page-three/page-three.component';
import {DemoPageFourComponent} from '../../../../../../src/app/docs/navigation/demos/page-four/page-four.component';
import {DemoPageFiveComponent} from '../../../../../../src/app/docs/navigation/demos/page-five/page-five.component';
import {Router, Routes} from '@angular/router';
import {skip} from 'rxjs/operators';
import {IconComponent} from '../../buttons/icon/icon.component';

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
const links = [
    {src: 'demo-first', label: 'First tab'},
    {src: 'demo-second', label: 'Tab Number Two', disabled: true},
    {src: 'demo-third', label: 'Randomly name so long and im no tired'},
    {src: 'demo-fourth', label: 'Why do we should put the long titles'},
    {src: 'demo-fifth', label: 'Tab tab tab tab tab tab tab3 long'},
    {src: 'demo-sixth', label: 'Tab tab tab tab tab tab tab4 long', disabled: true},
    {src: 'demo-seventh', label: 'Tab tab tab tab tab tab tab5 long'},
    {src: 'demo-eighth', label: 'Double dare you once again'},
];

describe('NavTabsComponent', () => {
    let component: NavTabsComponent;
    let fixture: ComponentFixture<TestComponent>;
    let navTabsDe: DebugElement;
    let navTabsEl: HTMLElement;
    let router: Router;
    let linksCount;

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
                IconComponent
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
        linksCount = new TestComponent().links.length;
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
        expect(component.tabs.length).toEqual(linksCount);
    });

    it('should be called #selectTab method after component content init', () => {
        spyOn(component, 'selectTab');
        component.ngAfterContentInit();
        fixture.detectChanges();

        expect(component.selectTab).toHaveBeenCalled();
    });

    it('should linkTabs length be equal tabGroup length after component content init', () => {
        component.ngAfterContentInit();
        expect(component.tabs.length).toEqual(component.tabGroup.length);
    });

    it('should #setTabSizes be called after component view init', () => {
        spyOn(component, 'setTabSizes');
        component.ngAfterViewInit();

        expect(component.setTabSizes).toHaveBeenCalled();
    });

    it('should #isArrows be true after component view init, if container width is less then sum of tabs width', () => {
        component.containerWidth = -1;
        component.ngAfterViewInit();
        expect(component.isArrows).toBeTrue();
    });

    it('should #isArrows be false after component view init, if container width is greater then sum of tabs width', () => {
        component.containerWidth = 99999;
        component.ngAfterViewInit();
        expect(component.isArrows).toBeFalse();
    });

    it('should #tabsWrapperElement children was copied to #tabsViewElements after content view init', () => {
        expect(component.tabsViewElements.length).toEqual(component.tabsWrapperElement.children.length);
        expect(component.tabsViewElements[0]).toEqual(component.tabsWrapperElement.children[0]);
        expect(component.tabsViewElements[3]).toEqual(component.tabsWrapperElement.children[3]);
    });

    it('should #arrowWidth be 40 by default', () => {
        expect(component.arrowWidth).toEqual(40);
    });

    it('should arrow elements be hidden if #isArrows is false', () => {
        component.isArrows = false;
        fixture.detectChanges();

        expect(component.arrowLeftElement.style.display).toEqual('none');
        expect(component.arrowRightElement.style.display).toEqual('none');
    });

    it('should arrow elements display flex if #isArrows is true', () => {
        component.isArrows = true;
        fixture.detectChanges();

        expect(component.arrowLeftElement.style.display).toEqual('flex');
        expect(component.arrowRightElement.style.display).toEqual('flex');
    });

    it('should arrow elements has width style equal #arrowWidth property', () => {
        expect(component.arrowLeftElement.style.width).toEqual(`${component.arrowWidth}px`);
        expect(component.arrowRightElement.style.width).toEqual(`${component.arrowWidth}px`);
    });

    it('should right arrow element be disabled if no more space to scroll', () => {
        component.arrowWidth = -9999;
        fixture.detectChanges();

        expect(component.arrowLeftElement.disabled).toBeFalse();
        expect(component.arrowRightElement.disabled).toBeTrue();
    });

    it('should left arrow element be disabled if no more space to scroll', () => {
        component.arrowWidth = 9999;
        fixture.detectChanges();

        expect(component.arrowLeftElement.disabled).toBeTrue();
        expect(component.arrowRightElement.disabled).toBeFalse();
    });

    it('should #slideMeasure has width and left properties equal 0 by default', () => {
        expect(component.slideMeasure.width).toEqual(0);
        expect(component.slideMeasure.left).toEqual(0);
    });

    it('should .slide element has width and left styles equal #slideMeasure properties', () => {
        const el: HTMLElement = component.containerElement.querySelector('.slide');
        expect(el.style.width).toEqual(`${component.slideMeasure.width}px`);
        expect(el.style.left).toEqual(`${component.slideMeasure.left}px`);
    });

    it('should #getRouteAnimation return -1 if activatedRouteData.index is undefined', () => {
        const stub = fixture.componentInstance.routerStub;
        expect(component.getRouteAnimation(stub)).toEqual(-1);
    });

    it('should #changeRects method set #tabScrollRect & #curTabClientRect properties', () => {
        component.ngAfterViewInit();
        component.curTab = component.containerElement.querySelector(`.sdk-tab-container__tab`);
        fixture.detectChanges();
        component.changeRects();
        fixture.detectChanges();

        expect(component.tabsScrollRect).toEqual(component.tabsWrapperElement.getBoundingClientRect());
        expect(component.curTabClientRect).toEqual(component.curTab.getBoundingClientRect());
    });

    it('should #containerPosition$ stream call #changeRects method', () => {
        spyOn(component, 'changeRects');
        component.ngOnInit();
        fixture.detectChanges();

        component.containerPosition$.subscribe(() => component.changeRects());
        component.containerPosition$.next(true);
        expect(component.changeRects).toHaveBeenCalled();
    });

    it('should #setSizes method set correct containers sizes', () => {
        component.ngOnInit();
        component.setSizes();

        expect(component.containerRect).toEqual(component.containerElement.getBoundingClientRect());
        expect(component.containerWidth).toEqual(component.containerRect.width);
        component.isArrows = true;
        expect(component.tabsWrapperWidth).toEqual(component.containerWidth - component.arrowWidth * 2);
        component.isArrows = false;
        component.setSizes();
        expect(component.tabsWrapperWidth).toEqual(component.containerWidth);
    });

    it('should #setTabSize set correctly sizes for #allTabsWidth & #tabsScrollRect', () => {
        component.ngAfterViewInit();
        component.setTabSizes();
        const tabSizesSum = component.tabsViewElements.reduce((acc, cur) => acc += cur.offsetWidth, 0);

        expect(component.allTabsWidth).toEqual(tabSizesSum);
        expect(component.tabsScrollRect).toEqual(component.tabsWrapperElement.getBoundingClientRect());
    });

    it('should #setUnderlineMeasure set underline sizes by current tab element', () => {
        component.ngAfterViewInit();
        component.curTab = component.containerElement.querySelector('.sdk-tab-container__tab');
        component.setUnderlineMeasure();

        expect(component.curTabClientRect).toEqual(component.curTab.getBoundingClientRect());
        expect(component.slideMeasure.width).toEqual(`${component.curTabClientRect.width}px`);
        expect(component.slideMeasure.left).toEqual(`${component.curTab.offsetLeft}px`);

        component.curTab = document.createElement('div');
        component.setUnderlineMeasure();
        expect(component.curTabClientRect).toEqual(component.curTab.getBoundingClientRect());
        expect(component.slideMeasure.width).toEqual(`0px`);
        expect(component.slideMeasure.left).toEqual(`0px`);
    });

    it('should #moveContainer method emit #containerPosition event', () => {
        component.containerPosition$.pipe(skip(1)).subscribe((res) => {
            expect(res).toBeTrue();
        });
        component.moveContainer(100);
    });

    it('should #moveContainer set correct left style to #tabsWrapperElement', () => {
        const superBigNumber = 9999;
        const smallNumber = 1;
        component.ngAfterViewInit();
        component.allTabsWidth = superBigNumber;
        component.moveContainer(smallNumber);

        expect(component.tabsWrapperElement.style.left).toEqual(`${smallNumber}px`);
        const otherValue = component.containerWidth - (component.arrowLeftElement.offsetWidth * 2) - component.allTabsWidth;
        component.moveContainer(superBigNumber);
        expect(component.tabsWrapperElement.style.left).toEqual(`${otherValue}px`);
    });

    it('should #scrollLeft method set #tabsScrollRect as #tabsWrapperElement client rect', () => {
        component.ngAfterViewInit();
        component.scrollRight();
        expect(component.tabsScrollRect).toEqual(component.tabsWrapperElement.getBoundingClientRect());
    });

    it('should #scrollRight method set #tabsScrollRect as #tabsWrapperElement client rect', () => {
        component.ngAfterViewInit();
        component.scrollLeft();
        expect(component.tabsScrollRect).toEqual(component.tabsWrapperElement.getBoundingClientRect());
    });

    it('should #scrollRight use argument value if element has space to scroll and argument is valid and exists', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');
        const stepValue = 100;
        component.arrowWidth = -32000;

        component.scrollRight(stepValue);
        expect(component.moveContainer).toHaveBeenCalledWith(-stepValue);
    });

    it('should #scrollRight use default step value if element has space to scroll and argument is undefined', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');
        const defaultStep = component.containerRect.width / 100 * 30;
        component.arrowWidth = -32000;

        component.scrollRight();
        expect(component.moveContainer).toHaveBeenCalledWith(-defaultStep);
    });

    it('should #scrollLeft use argument value if element has space to scroll and argument is valid and exists', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');
        const stepValue = 100;
        component.arrowWidth = 32000;

        component.scrollLeft(stepValue);
        expect(component.moveContainer).toHaveBeenCalledWith(stepValue);
    });

    it('should #scrollLeft use default step value if element has space to scroll and argument is undefined', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');
        const defaultStep = component.containerRect.width / 100 * 30;
        component.arrowWidth = 32000;

        component.scrollLeft();
        expect(component.moveContainer).toHaveBeenCalledWith(defaultStep);
    });

    it('should #scrollLeft no scroll if not enough space to do it', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');

        component.arrowWidth = -32000;

        component.scrollLeft();
        expect(component.moveContainer).toHaveBeenCalledWith(0);
    });

    it('should #scrollLeft no scroll if not enough space to do it', () => {
        component.ngAfterViewInit();
        spyOn(component, 'moveContainer');
        component.arrowWidth = 32000;

        const step = (component.tabsScrollRect.right - component.containerRect.right) + component.arrowWidth;

        component.scrollRight();
        expect(component.moveContainer).toHaveBeenCalledWith(-step);
    });

    describe('#selectTab tests', () => {
        const link = links[0];
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should #selectTab call #setUnderlineMeasure method', fakeAsync(() => {
            spyOn(component, 'setUnderlineMeasure');
            router.navigate([link.src]);
            component.selectTab();
            tick(500);
            fixture.detectChanges();
            expect(component.setUnderlineMeasure).toHaveBeenCalled();
        }));

        it('should #selectTab method set #curTab & #curTabClientRect', fakeAsync(() => {
            router.navigate([link.src]);
            component.selectTab();
            tick(500);
            fixture.detectChanges();

            expect(component.curTab.innerText).toEqual(link.label);
            expect(component.curTabClientRect).toEqual(component.curTab.getBoundingClientRect());
        }));

        it('should #selectTab method do not call #scrollLeft or #scrollRight methods if #isArrows false', fakeAsync(() => {
            spyOn(component, 'scrollRight');
            spyOn(component, 'scrollLeft');
            router.navigate([link.src]);
            component.isArrows = false;
            component.selectTab();
            tick(500);
            fixture.detectChanges();

            expect(component.scrollRight).not.toHaveBeenCalled();
            expect(component.scrollLeft).not.toHaveBeenCalled();
        }));
    });

    describe('Test after component was init', () => {
        let slide: HTMLElement;
        beforeEach(() => {
            spyOn(component, 'setSizes');
            component.ngOnInit();
            slide = component.containerElement.querySelector('.slide');
        });

        it('should #containerElement has .sdk-tab-container class', () => {
            expect(component.containerElement).toHaveClass('sdk-tab-container');
        });

        it('should #tabsWrapperElement has .sdk-tab-container__tabs-scroll class', () => {
            expect(component.tabsWrapperElement).toHaveClass('sdk-tab-container__tabs-scroll');
        });

        it('should #tabsWrapperElement has count of tabs be equal #tabGroup length', () => {
            const children = component.tabsWrapperElement.children;
            const childrenLength = slide ? children.length - 1 : children.length;
            expect(childrenLength).toBe(linksCount);
        });

        it('should tabs text be equal links #label', () => {
            const children = component.tabsWrapperElement.children;
            const childrenLength = slide ? children.length - 1 : children.length;
            for (let i = 0; i < childrenLength; i++) {
                expect(children[i].innerText).toEqual(links[i].label);
            }
        });

        it('should arrow elements has .sdk-tab-container__arrow class', () => {
            expect(component.arrowLeftElement).toHaveClass('sdk-tab-container__arrow');
            expect(component.arrowRightElement).toHaveClass('sdk-tab-container__arrow');
        });

        it('should #arrowLeftElement has .sdk-tab-container__arrow--left class', () => {
            expect(component.arrowLeftElement).toHaveClass('sdk-tab-container__arrow--left');
        });

        it('should #arrowRightElement has .sdk-tab-container__arrow--right class', () => {
            expect(component.arrowRightElement).toHaveClass('sdk-tab-container__arrow--right');
        });

        it('should #onInit call #setSizes() method', () => {
            expect(component.setSizes).toHaveBeenCalled();
        });

        it('should click event on #arrowRightElement call #scrollRight method if element is not disabled', () => {
            component.arrowRightElement.disabled = false;
            spyOn(component, 'scrollRight');
            component.arrowRightElement.click();
            expect(component.scrollRight).toHaveBeenCalled();
        });

        it('should click event on #arrowLeftElement call #scrollLeft method if element is not disabled', () => {
            component.arrowLeftElement.disabled = false;
            spyOn(component, 'scrollLeft');
            component.arrowLeftElement.click();
            expect(component.scrollLeft).toHaveBeenCalled();
        });

        it('should click event on #arrowRightElement do not call #scrollRight method if element is disabled', () => {
            component.arrowRightElement.disabled = true;
            spyOn(component, 'scrollRight');
            component.arrowRightElement.click();
            expect(component.scrollRight).not.toHaveBeenCalled();
        });

        it('should click event on #arrowLeftElement do not call #scrollLeft method if element is disabled', () => {
            component.arrowLeftElement.disabled = true;
            spyOn(component, 'scrollLeft');
            component.arrowLeftElement.click();
            expect(component.scrollLeft).not.toHaveBeenCalled();
        });

        it('should window resize event call #setSizes method', () => {
            const event = new Event('resize');
            window.dispatchEvent(event);

            expect(component.setSizes).toHaveBeenCalled();
        });

        it('should #isArrow be true after window resize if sum of tabs width is more then container width', () => {
            const event = new Event('resize');
            component.allTabsWidth = 99999999;
            fixture.detectChanges();
            window.dispatchEvent(event);

            expect(component.isArrows).toBeTrue();
        });

        it('should #isArrow be false after window resize if sum of tabs width is less then container width', () => {
            const event = new Event('resize');
            component.allTabsWidth = -1;
            fixture.detectChanges();
            window.dispatchEvent(event);

            expect(component.isArrows).toBeFalse();
        });

        it('should #tabsWrapperElement left style be 0px if container has no arrows', () => {
            const event = new Event('resize');
            component.allTabsWidth = -1;
            fixture.detectChanges();
            window.dispatchEvent(event);

            expect(component.tabsWrapperElement.style.left).toEqual('0px');
        });

        it('should subscription be unsubscribed after component was destroyed', () => {
            expect(component.subscription.closed).toBeFalse();
            component.ngOnDestroy();
            expect(component.subscription.closed).toBeTrue();
        });
    });
});

@Component({
    selector: 'sdk-test-cmp',
    template: `
        <sdk-nav-tab-group>
            <a sdkTabLink *ngFor="let link of links"
               [disabled]="link.disabled"
               [routerLink]="link.src"
               [label]="link.label"></a>
        </sdk-nav-tab-group>
        <router-outlet #routerStub="outlet"></router-outlet>`,
})
class TestComponent {
    @ViewChild('routerStub', {static: true}) public routerStub;
    public links = links;
}
