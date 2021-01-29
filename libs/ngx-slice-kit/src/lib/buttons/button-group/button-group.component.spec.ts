import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonGroupComponent } from './button-group.component';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    template: `<sdk-button-group>
                <button sdk-flat-button>Um</button>
                <button sdk-flat-button>Dois</button>
                <button sdk-flat-button>Tres</button>
                <button sdk-flat-button>Quatro</button>
            </sdk-button-group>`,
})
class TestGroupComponent {
}

describe('ButtonGroupComponent', () => {
    let component: ButtonGroupComponent;
    let fixture: ComponentFixture<TestGroupComponent>;
    let group: HTMLElement;
    let groupContainer: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestGroupComponent, ButtonGroupComponent, ButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestGroupComponent);
        component = fixture.debugElement.children[0].componentInstance;
        group = fixture.debugElement.nativeElement;
        groupContainer = group.querySelector('.sdk-button-group-container');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add special class by #color', () => {
        expect(groupContainer.classList.contains('sdk-button-group-container--primary'))
            .toEqual(true, 'primary color by default');
        expect(groupContainer.classList.contains('sdk-button-group-container--regular'))
            .not.toEqual(true, 'cant be two classes in same time');

        component.color = 'regular';
        fixture.detectChanges();
        expect(groupContainer.classList.contains('sdk-button-group-container--regular'))
            .toEqual(true, 'regular because #color is equal "regular"');
        expect(groupContainer.classList.contains('sdk-button-group-container--primary'))
            .not.toEqual(true, 'cant be two classes in same time');
    });

    it('should be correct number of buttons in group', () => {
        const buttonsCount = 4;
        expect(component.btnGroup.length).toBe(buttonsCount);
    });

    it('should buttons indexes be correct', () => {
        for (let i = 0; i < component.btnGroup.length; i++) {
            const curButton = groupContainer.children[i];
            const curButtonIndex = curButton.getAttribute('btn-group-index');
            expect(+curButtonIndex).toBe(i, 'should indexes be from 0 to n with step 1');
        }
    });

    it('should click event set active class to target button and delete it from other', () => {
        const btn0: HTMLElement = groupContainer.children[0] as HTMLElement;
        const btn1: HTMLElement = groupContainer.children[1] as HTMLElement;

        btn0.click();
        fixture.detectChanges();
        expect(btn0.classList.contains('sdk-button--active')).toBe(true, 'should add active class after click');
        expect(btn1.classList.contains('sdk-button--active')).not.toBe(true, 'other buttons does not have active class');

        btn1.click();
        fixture.detectChanges();
        expect(btn1.classList.contains('sdk-button--active')).toBe(true, 'should add active class after click');
        expect(btn0.classList.contains('sdk-button--active')).not.toBe(true, 'other buttons does not have active class');
    });

    it('should #onClick() be called by click event', () => {
        const btn: HTMLElement = groupContainer.children[0] as HTMLElement;

        spyOn(component, 'onClick');
        btn.click();
        expect(component.onClick).toHaveBeenCalled();
    });

    it('click on button should emmit event', () => {
        const element: HTMLElement = groupContainer.children[0] as HTMLElement;
        const index = element.getAttribute('btn-group-index');
        const expectedEventBody = {element, index};
        let eventBody;

        component.clicked.subscribe(e => {
            eventBody = e;
        });

        component.onClick({target: element});
        fixture.detectChanges();
        expect(eventBody.element).toEqual(expectedEventBody.element);
        expect(eventBody.index).toEqual(expectedEventBody.index);
    });

    it('should #removeActiveClass(el) remove class', () => {
        const btn: HTMLElement = groupContainer.children[0] as HTMLElement;
        btn.click();
        fixture.detectChanges();
        expect(btn.classList.contains('sdk-button--active')).toBe(true, 'should add active class after click');
        component.removeActiveClass(btn);
        expect(btn.classList.contains('sdk-button--active')).not.toBe(true, 'function should remove .sdk-button--active class');
    });

    it('buttons should be rendered', () => {
        component.ngAfterContentInit();
        const renderedElements = groupContainer.children;
        const expectedElementsCount = 4;

        expect(renderedElements.length).toBe(expectedElementsCount, 'all inserted buttons should be rendered');
    });
});
