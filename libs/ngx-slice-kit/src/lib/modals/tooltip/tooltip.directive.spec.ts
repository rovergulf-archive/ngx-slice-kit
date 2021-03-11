import { TooltipDirective } from './tooltip.directive';
import {Component, ElementRef, PLATFORM_ID, Renderer2} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('TooltipDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let tooltipDe;
    let tooltipEl;
    let directive;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        tooltipDe = fixture.debugElement.query(By.directive(TooltipDirective));
        tooltipEl = tooltipDe.nativeElement;
        directive = tooltipDe.injector.get(TooltipDirective);

        fixture.detectChanges();
    }));


    it('should create an instance', () => {
        let elementRef: ElementRef;
        let renderer: Renderer2;
        directive = new TooltipDirective(elementRef, renderer);
        expect(directive).toBeTruthy();
    });
});

@Component({
    template: `<p sdkTooltip></p>>`
})
class TestComponent {
}
