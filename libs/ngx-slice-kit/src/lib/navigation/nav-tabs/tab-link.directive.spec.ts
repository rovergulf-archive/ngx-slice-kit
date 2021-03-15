import {TabLinkDirective} from './tab-link.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('TabLinkDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let tablinkDe;
    let tablinkEl;
    let directive;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TabLinkDirective, TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        tablinkDe = fixture.debugElement.query(By.directive(TabLinkDirective));
        directive = tablinkDe.injector.get(TabLinkDirective);
        tablinkEl = tablinkDe.nativeElement;

        fixture.detectChanges();
    }));

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should #disabled be false by default', () => {
        expect(directive.disabled).toBeFalse();
    });

    it('should directive element has default class', () => {
        const defClass = 'sdk-tab-container__tab';
        expect(directive.elementClass).toEqual(defClass);
        expect(tablinkEl).toHaveClass(defClass);
    });

});

@Component({
    template: `
        <a sdkTabLink>test</a>>`
})
class TestComponent {
}
