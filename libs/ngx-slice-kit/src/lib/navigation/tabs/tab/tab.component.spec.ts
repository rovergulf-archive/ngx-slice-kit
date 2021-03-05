import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TabComponent} from './tab.component';
import {Component, DebugElement} from '@angular/core';

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;
    let tabDe: DebugElement;
    let tabEl: HTMLElement;
    let contentEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TabComponent,
                TestComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        tabDe = fixture.debugElement;
        tabEl = tabDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #active be false by default', () => {
        expect(component.active).toBeFalse();
    });

    it('should #disabled be false by default', () => {
        expect(component.disabled).toBeFalse();
    });

    it('should #hiding be false by default', () => {
        expect(component.hiding).toBeFalse();
    });

    it('should #slideDirection be empty string by default', () => {
        expect(component.slideDirection).toEqual('');
    });

    it('should content element has hiding class if #hiding is true', () => {
        component.hiding = true;
        fixture.detectChanges();
        contentEl = tabEl.querySelector('.sdk-tab__content');
        expect(contentEl).toHaveClass('sdk-tab__content--hiding');
    });

    it('should content element has .sdk-tab__content--hiding-slide-right class if #hiding is true and #slideDirection is "slideRight"', () => {
        component.hiding = true;
        component.slideDirection = 'slideRight';
        fixture.detectChanges();
        contentEl = tabEl.querySelector('.sdk-tab__content');
        expect(contentEl).toHaveClass('sdk-tab__content--hiding-slide-right');
    });

    it('should content element has .sdk-tab__content--hiding-slide-left class if #hiding is true and #slideDirection is "slideLeft"', () => {
        component.hiding = true;
        component.slideDirection = 'slideLeft';
        fixture.detectChanges();
        contentEl = tabEl.querySelector('.sdk-tab__content');
        expect(contentEl).toHaveClass('sdk-tab__content--hiding-slide-left');
    });

    it('should content element has .sdk-tab__content--slide-right class if #hiding is false and #slideDirection is "slideRight"', () => {
        component.active = true;
        component.hiding = false;
        component.slideDirection = 'slideRight';
        fixture.detectChanges();
        contentEl = tabEl.querySelector('.sdk-tab__content');
        expect(contentEl).toHaveClass('sdk-tab__content--slide-right');
    });

    it('should content element has .sdk-tab__content--slide-left class if #hiding is false and #slideDirection is "slideLeft"', () => {
        component.active = true;
        component.hiding = false;
        component.slideDirection = 'slideLeft';
        fixture.detectChanges();
        contentEl = tabEl.querySelector('.sdk-tab__content');
        expect(contentEl).toHaveClass('sdk-tab__content--slide-left');
    });
});


@Component({
    selector: 'sdk-test-cmp',
    template: `
        <sdk-tab label="Tab 1">
            <div><h1>Title 1</h1></div>
        </sdk-tab>`
})
class TestComponent {
}
