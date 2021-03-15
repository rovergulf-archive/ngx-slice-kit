import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, DebugElement, EventEmitter, Output} from '@angular/core';
import {DialogService} from './dialog.service';
import {DialogDirective} from './dialog.directive';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    let dialogDe: DebugElement;
    let dialogEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                DialogComponent,
                DialogDirective,
                TestComponent
            ],
            providers: [DialogService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        dialogDe = fixture.debugElement;
        dialogEl = dialogDe.nativeElement;
        component.component = TestComponent;
    });

    afterAll(() => {
        document.querySelectorAll('sdk-dialog').forEach(el => el.remove());
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should element has z-index style equal #id', () => {
        fixture.detectChanges();
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-wrap');
        component.id = 1000;
        fixture.detectChanges();
        expect(el.style.zIndex).toEqual('1000');
    });

    it('should .sdk-dialog-content-wrap border radius be 0 by default', () => {
        fixture.detectChanges();
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content-wrap');

        expect(el.style.borderRadius).toEqual('0px');
    });

    it('should .sdk-dialog-content border radius be 0 by default', () => {
        fixture.detectChanges();
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content');

        expect(el.style.borderRadius).toEqual('0px');
    });

    it('should .sdk-dialog-content-wrap border radius be equal #borderRadius px', () => {
        fixture.detectChanges();
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content-wrap');
        const stubBr = 32;
        component.borderRadius = stubBr;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        expect(el.style.borderRadius).toEqual(`${stubBr}px`);
        expect(component.br).toEqual(`${stubBr}px`);
    });

    it('should .sdk-dialog-content border radius be equal #borderRadius px', () => {
        fixture.detectChanges();
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content');
        const stubBr = 32;
        component.borderRadius = stubBr;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        expect(el.style.borderRadius).toEqual(`${stubBr}px`);
        expect(component.br).toEqual(`${stubBr}px`);
    });

    it('should #br be 0 by default if #borderRadius is 0 or less after component was init', () => {
        fixture.detectChanges();
        component.borderRadius = 0;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.br).toEqual('0');
    });

    it('should #state be "closed" by default', () => {
        expect(component.state).toEqual('closed');
    });

    it('should #state be "opened" after component was init', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.state).toEqual('opened');
    });

    it('should component init call #loadComponent method', () => {
        spyOn(component, 'loadComponent');
        component.ngOnInit();

        expect(component.loadComponent).toHaveBeenCalled();
    });

    it('should component init call #hideOnRouterEvents method', () => {
        spyOn(component, 'hideOnRouterEvents');
        component.ngOnInit();

        expect(component.hideOnRouterEvents).toHaveBeenCalled();
    });

    it('should #state be "closed" after component was destroyed', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.state).toEqual('opened');
        component.ngOnDestroy();
        fixture.detectChanges();
        expect(component.state).toEqual('closed');
    });

    it('should #closed call #completed method after component was destroyed', () => {
        spyOn(component.closed, 'complete');
        component.ngOnDestroy();

        expect(component.closed.complete).toHaveBeenCalled();
    });

    it('should #onSuccess method stream value', () => {
        let counter = 0;
        component.closed.subscribe(res => {
            switch (counter) {
                case 0:
                    expect(res).toBeTrue();
                    break;
                case 1:
                    expect(res).toBeFalse();
                    break;
                default:
                    console.log('Unexpected value of counter');
            }
            counter++;
        });

        component.onSuccess(true);
        component.onSuccess(false);
    });

    it('should #onSuccess call #closed.complete method', () => {
        spyOn(component.closed, 'complete');
        component.onSuccess(true);

        expect(component.closed.complete).toHaveBeenCalled();
    });

    it('should #onBackdrop method call #onSuccess with "null" as value if #hideOnBackdrop prop is true', () => {
        spyOn(component, 'onSuccess');
        component.hideOnBackdrop = true;
        fixture.detectChanges();
        component.onBackdrop();

        expect(component.onSuccess).toHaveBeenCalledWith(null);
    });

    it('should #onBackdrop method do not call #onSuccess if #hideOnBackdrop prop is false', () => {
        spyOn(component, 'onSuccess');
        component.hideOnBackdrop = false;
        fixture.detectChanges();
        component.onBackdrop();

        expect(component.onSuccess).not.toHaveBeenCalled();
    });

    it('should .sdk-dialog-content has .disable-scroll class if #disableScroll is true', () => {
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content');

        component.disableScroll = true;
        fixture.detectChanges();

        expect(el).toHaveClass('disable-scroll');
    });

    it('should .sdk-dialog-content has no .disable-scroll class if #disableScroll is false', () => {
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-content');

        component.disableScroll = false;
        fixture.detectChanges();

        expect(el).not.toHaveClass('disable-scroll');
    });

    it('should click on backdrop call #onBackdrop method', () => {
        const el: HTMLElement = dialogEl.querySelector('.sdk-dialog-backdrop');

        spyOn(component, 'onBackdrop');
        el.click();

        expect(component.onBackdrop).toHaveBeenCalled();
    });

    it('should element has state attribute equal #state prop', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(dialogEl.getAttribute('state')).toEqual('opened');
    });

    it('should #hideOnBackdrop and #hideOnEscape be true by default', () => {
        expect(component.hideOnBackdrop).toBeTrue();
        expect(component.hideOnEscape).toBeTrue();
    });

    it('should #hideOnRouter add subscription to #escapeSub', () => {
        component.hideOnRouterEvents();

        expect(component.escapeSub).not.toBeUndefined();
        expect(component.escapeSub.closed).toBeFalse();
    });

    it('should be modalDirective', () => {
        expect(component.modalDirective).not.toBeUndefined();
    });

    it('should data set correctly', () => {
        const stubData = {
            a: 'clash',
            b: 'hsalc',
            c: 12
        };

        component.data = stubData;
        fixture.detectChanges();

        expect(component.data).toEqual(stubData);
    });
});

@Component({
    template: `
        <div>
            <p>some text</p>
        </div>
    `
})
class TestComponent {
    @Output() result = new EventEmitter();
}
