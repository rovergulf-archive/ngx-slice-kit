import {TooltipDirective} from './tooltip.directive';
import {Component, Renderer2} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {interval, Subscription} from 'rxjs';
import {delay, last} from 'rxjs/operators';

describe('TooltipDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let tooltipHolderDe;
    let tooltipHolderEl;
    let directive;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TestComponent],
            providers: [Renderer2]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        tooltipHolderDe = fixture.debugElement.query(By.directive(TooltipDirective));
        tooltipHolderEl = tooltipHolderDe.nativeElement;
        directive = tooltipHolderDe.injector.get(TooltipDirective);
        fixture.detectChanges();
    }));

    afterEach(() => {
        document.querySelectorAll('.sdk-tooltip').forEach(el => el.remove());
    });


    it('should create an instance', () => {
        // let elementRef: ElementRef;
        // let renderer: Renderer2;
        // directive = new TooltipDirective(elementRef, renderer);
        expect(directive).toBeTruthy();
    });

    it('should #showOnClick be false by default', () => {
        expect(directive.showOnClick).toBeFalse();
    });

    it('should #position be "top" by default', () => {
        expect(directive.position).toEqual('top');
    });

    it('should #offset be 12 by default', () => {
        expect(directive.offset).toEqual(12);
    });

    it('should "mouse enter" trigger #show method if tooltip does not exist yet and #showOnClick is false', () => {
        const mouseEvent = new MouseEvent('mouseenter');
        spyOn(directive, 'show');
        directive.tooltip = undefined;
        directive.showOnClick = false;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).toHaveBeenCalled();
    });

    it('should "mouse enter" do not trigger #show method if tooltip does not exist yet and #showOnClick is true', () => {
        const mouseEvent = new MouseEvent('mouseenter');
        spyOn(directive, 'show');
        directive.tooltip = undefined;
        directive.showOnClick = true;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).not.toHaveBeenCalled();
    });

    it('should "mouse enter" do not trigger #show method if tooltip exists yet and #showOnClick is false', () => {
        const mouseEvent = new MouseEvent('mouseenter');
        spyOn(directive, 'show');
        directive.tooltip = tooltipHolderEl;
        directive.showOnClick = false;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).not.toHaveBeenCalled();
    });

    it('should "click" trigger #show method if tooltip does not exist yet and #showOnClick is true', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(directive, 'show');
        directive.tooltip = undefined;
        directive.showOnClick = true;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).toHaveBeenCalled();
    });

    it('should "click" do not trigger #show method if tooltip does not exist yet and #showOnClick is false', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(directive, 'show');
        directive.tooltip = undefined;
        directive.showOnClick = false;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).not.toHaveBeenCalled();
    });

    it('should "click" do not trigger #show method if tooltip exists and #showOnClick is true', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(directive, 'show');
        directive.tooltip = tooltipHolderEl;
        directive.showOnClick = true;
        fixture.detectChanges();

        tooltipHolderEl.dispatchEvent(mouseEvent);

        expect(directive.show).not.toHaveBeenCalled();
    });

    it('should "mousewheel" event does not trigger #hide method and trigger unsubscribe from directive timer if tooltip is not exist ',
        () => {
            const mouseEvent = new MouseEvent('mousewheel');
            directive.sub = new Subscription();
            spyOn(directive, 'hide');
            directive.tooltip = undefined;

            fixture.detectChanges();
            tooltipHolderEl.dispatchEvent(mouseEvent);

            expect(directive.hide).not.toHaveBeenCalled();
            expect(directive.sub.closed).toBeTrue();
        });

    it('should "mousewheel" event trigger #hide method and does not unsubscribe from timer if tooltip already exists ',
        () => {
            const mouseEvent = new MouseEvent('mousewheel');
            directive.sub = new Subscription();
            spyOn(directive, 'hide');
            directive.tooltip = tooltipHolderEl;

            fixture.detectChanges();
            tooltipHolderEl.dispatchEvent(mouseEvent);

            expect(directive.hide).toHaveBeenCalled();
            expect(directive.sub.closed).toBeFalse();
        });

    it('should "mouseleave" event does not trigger #hide method and trigger unsubscribe from directive timer if tooltip is not exist ',
        () => {
            const mouseEvent = new MouseEvent('mouseleave');
            directive.sub = new Subscription();
            spyOn(directive, 'hide');
            directive.tooltip = undefined;

            fixture.detectChanges();
            tooltipHolderEl.dispatchEvent(mouseEvent);

            expect(directive.hide).not.toHaveBeenCalled();
            expect(directive.sub.closed).toBeTrue();
        });

    it('should "mouseleave" event trigger #hide method and does not unsubscribe from timer if tooltip already exists',
        () => {
            const mouseEvent = new MouseEvent('mouseleave');
            directive.sub = new Subscription();
            spyOn(directive, 'hide');
            directive.tooltip = tooltipHolderEl;

            fixture.detectChanges();
            tooltipHolderEl.dispatchEvent(mouseEvent);

            expect(directive.hide).toHaveBeenCalled();
            expect(directive.sub.closed).toBeFalse();
        });

    it('should delete tooltip element after #hide was called', () => {
        directive.create();
        fixture.detectChanges();
        directive.hide();

        const el: HTMLElement = document.querySelector('.sdk-tooltip');

        expect(directive.tooltip).toBeNull();
        expect(el).toBeNull();
    });

    it('should #create method set #tooltip and #tooltipContent', () => {
        directive.create();

        expect(directive.tooltip).toBeTruthy();
        expect(directive.tooltipContent).toBeTruthy();
    });

    it('should #create set #message text to #tooltipContent', () => {
        const stubText = 'リライト';
        directive.message = stubText;
        directive.create();

        expect(directive.tooltipContent.textContent).toEqual(stubText);
        const el: HTMLElement = directive.tooltip.querySelector('.sdk-tooltip__content');
    });

    it('should #create put #tooltipContent in #tooltip', () => {
        const stubText = '触れたい 確かめたい';
        directive.message = stubText;
        directive.create();
        const el: HTMLElement = directive.tooltip.querySelector('.sdk-tooltip__content');
        expect(el).not.toBeNull();
    });

    it('should #create add #tooltip in document', () => {
        directive.create();
        const el: HTMLElement = document.querySelector('.sdk-tooltip');
        expect(el).not.toBeNull();
    });

    it('should #create add classes for #tooltip', () => {
        directive.create();

        expect(directive.tooltip).toHaveClass('sdk-tooltip');
        expect(directive.tooltip).toHaveClass('sdk-tooltip--top');
        expect(directive.tooltipContent).toHaveClass('sdk-tooltip__content');
    });

    it('should #changePosition change #tooltip classes', () => {
        directive.create();
        directive.changePosition(directive.position, 'left');

        expect(directive.tooltip).toHaveClass('sdk-tooltip--left');
        expect(directive.tooltip).not.toHaveClass('sdk-tooltip--top');

        directive.changePosition(directive.position, 'right');

        expect(directive.tooltip).toHaveClass('sdk-tooltip--right');
        expect(directive.tooltip).not.toHaveClass('sdk-tooltip--left');
    });

    it('should #show method call #create & #setPosition and add .sdk-tooltip-show class', fakeAsync(() => {
        directive.create();
        spyOn(directive, 'create');
        spyOn(directive, 'setPosition');
        directive.delay = 500;
        directive.show();

        tick(1000);
        fixture.detectChanges();
        expect(directive.create).toHaveBeenCalled();
        expect(directive.setPosition).toHaveBeenCalled();
        expect(directive.tooltip).toHaveClass('sdk-tooltip-show');
    }));

    it('should #checkOversize return true if no enough space for tooltip & isDirectionForward arg is true', () => {
        const options = {
            hostPosition: 0,
            hostSize: 0,
            tooltipSize: 0
        };

        const res = directive.checkOversize(options, 'width', true);
        expect(res).toBeTrue();
    });

    it('should #checkOversize return false if tooltip has enough space and isDirectionForward arg is true', () => {
        const options = {
            hostPosition: 32000,
            hostSize: 32000,
            tooltipSize: 32000
        };

        const res = directive.checkOversize(options, 'width', true);
        expect(res).toBeFalse();
    });

    it('should #checkOversize return false if tooltip has enough space & isDirectionForward arg is false', () => {
        const options = {
            hostPosition: 0,
            hostSize: 0,
            tooltipSize: 0
        };

        const res = directive.checkOversize(options, 'width', false);
        expect(res).toBeFalse();
    });

    it('should #checkOversize return true if no enough space for tooltip & isDirectionForward arg is false', () => {
        const options = {
            hostPosition: 64,
            hostSize: 0,
            tooltipSize: 0
        };

        const res = directive.checkOversize(options, 'width', false);
        expect(res).toBeTrue();
    });

    it('should tooltip do not change position if #checkOversize is true', () => {
        directive.create();
        const hostPos = directive.triggerElement.getBoundingClientRect();
        const tooltipHeight = directive.tooltip.offsetHeight;
        fixture.detectChanges();
        directive.position = 'top';
        directive.offset = -32000;

        const options = {
            hostPosition: hostPos.top,
            hostSize: hostPos.height,
            tooltipSize: tooltipHeight
        };
        spyOn(directive, 'changePosition');
        directive.setPosition();

        expect(directive.checkOversize(options, 'height', false)).toBeTrue();
        expect(directive.changePosition).not.toHaveBeenCalled();

        directive.position = 'bottom';
        fixture.detectChanges();
        directive.setPosition();
        expect(directive.changePosition).not.toHaveBeenCalled();

        directive.position = 'left';
        fixture.detectChanges();
        directive.setPosition();
        expect(directive.changePosition).not.toHaveBeenCalled();

        directive.position = 'right';
        fixture.detectChanges();
        directive.setPosition();
        expect(directive.changePosition).not.toHaveBeenCalled();

        directive.offset = 32000;
        expect(directive.checkOversize(options, 'height', false)).toBeFalse();
    });
});

@Component({
    template: `<p sdkTooltip="some text"></p>>`
})
class TestComponent {
}
