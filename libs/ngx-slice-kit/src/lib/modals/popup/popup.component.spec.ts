import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import {DebugElement} from '@angular/core';
import {PopupService} from './popup.service';

describe('PopupComponent', () => {
    let component: PopupComponent;
    let fixture: ComponentFixture<PopupComponent>;
    let popupDe: DebugElement;
    let popupEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PopupComponent],
            providers: [PopupService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        popupDe = fixture.debugElement;
        popupEl = popupDe.nativeElement;
        fixture.detectChanges();
    });

    afterAll(() => {
        document.querySelectorAll('sdk-popup').forEach(el => el.remove());
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #closed call #complete method after component was destroyed', () => {
        spyOn(component.closed, 'complete');
        component.ngOnDestroy();

        expect(component.closed.complete).toHaveBeenCalled();
    });

    it('should #onSucces with "true" as argument emit #closed event with "true"', () => {
        spyOn(component.closed, 'emit');
        component.onSuccess(true);

        expect(component.closed.emit).toHaveBeenCalledWith(true);
    });

    it('should #onSucces with "false" as argument emit #closed event with "false"', () => {
        spyOn(component.closed, 'emit');
        component.onSuccess(false);

        expect(component.closed.emit).toHaveBeenCalledWith(false);
    });

    it('should #id be equal "1000" by default', () => {
        expect(component.id).toEqual(1000);
    });

    it('should component #id set wrapper z-index style', () => {
        const el: HTMLElement = popupEl.querySelector('.sdk-popup-wrap');

        expect(el.style.zIndex).toEqual('1000');
        component.id = 2000;
        fixture.detectChanges();
        expect(el.style.zIndex).toEqual('2000');
    });

    it('should click on backdrop close popup', () => {
        const el: HTMLElement = popupEl.querySelector('.sdk-popup-backdrop');
        spyOn(component, 'onSuccess');
        el.click();

        expect(component.onSuccess).toHaveBeenCalledWith(false);
    });

    it('should click on "ok" button close popup by #onSucces with "true" as argument', () => {
        const el: HTMLElement = popupEl.querySelector('footer button');
        spyOn(component, 'onSuccess');
        el.click();

        expect(component.onSuccess).toHaveBeenCalledWith(true);
    });

    it('should click on "cancel" button close popup by #onSucces with "false" as argument', () => {
        const el: HTMLElement = popupEl.querySelectorAll('footer button')[1] as HTMLElement;
        spyOn(component, 'onSuccess');
        el.click();

        expect(component.onSuccess).toHaveBeenCalledWith(false);
    });

    it('should "ok" button text be equal "Ok" by default', () => {
        const el: HTMLElement = popupEl.querySelector('footer button');
        expect(el.textContent).toEqual('Ok');
    });

    it('should "ok" button text be equal #ok property', () => {
        const stubText = 'some text';
        component.ok = stubText;
        fixture.detectChanges();
        const el: HTMLElement = popupEl.querySelector('footer button');
        expect(el.textContent).toEqual(stubText);
    });

    it('should "cancel" button text be equal "Cancel" by default', () => {
        const el: HTMLElement = popupEl.querySelectorAll('footer button')[1] as HTMLElement;
        expect(el.textContent).toEqual('Cancel');
    });

    it('should "cancel" button text be equal #cancel property', () => {
        const stubText = 'some text';
        component.cancel = stubText;
        fixture.detectChanges();
        const el: HTMLElement = popupEl.querySelectorAll('footer button')[1] as HTMLElement;
        expect(el.textContent).toEqual(stubText);
    });

    it('should popup text be equal #message', () => {
        const stubText = 'some text';
        component.message = stubText;
        fixture.detectChanges();
        const el: HTMLElement = popupEl.querySelector('section p');

        expect(el.textContent).toEqual(stubText);
    });

    it('should popup title be equal #title', () => {
        const stubText = 'some text';
        component.title = stubText;
        fixture.detectChanges();
        const el: HTMLElement = popupEl.querySelector('.sdk-h3');

        expect(el.textContent).toEqual(stubText);
    });
});
