import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { OptionsService } from './options.service';
import { Renderer2 } from '@angular/core';
import { DropdownService } from './dropdown.service';
import { SelectComponent } from './select/select.component';
import { DropdownOptions } from './dropdown.model';
import { OPTIONS1 } from '../../../../../src/app/shared/values/dropdowns.values';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let selectComponent: SelectComponent;
    let selectFixture: ComponentFixture<SelectComponent>;
    let opts: DropdownOptions;
    let optionsService: OptionsService;
    let dropdown: HTMLElement;
    const stubOption = OPTIONS1[0];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DropdownComponent, SelectComponent],
            providers: [
                // DOCUMENT,
                OptionsService,
                DropdownService,
                Renderer2,
            ]
        })
            .compileComponents();
        optionsService = TestBed.inject(OptionsService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
        selectFixture = TestBed.createComponent(SelectComponent);
        selectComponent = selectFixture.componentInstance;
        dropdown = fixture.debugElement.nativeElement;
        optionsService.options = OPTIONS1;

        opts = {
            triggerRect: selectComponent.selectElem.nativeElement.getBoundingClientRect(),
            fitWidth: true,
            multi: selectComponent.multi,
            parentElem: selectComponent.selectElem.nativeElement,
        };
        component.config = opts;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #onResult() emit result event with option as argument', () => {
        let expectedRes;
        component.result.subscribe(() => {
            expectedRes = stubOption;
        });

        component.onResult(stubOption);
        expect(expectedRes).toEqual(stubOption);
    });

    it('should #onResult() complete result', () => {
        spyOn(component.result, 'complete');
        component.onResult(stubOption);

        expect(component.result.complete).toHaveBeenCalled();
    });

    it('should #onResult() unsubscribe from #sub', () => {
        spyOn(component.sub, 'unsubscribe');
        component.onResult(stubOption);

        expect(component.sub.unsubscribe).toHaveBeenCalled();
    });

    it('should #select() call #onResult() and pass option as argument', () => {
        const ev = new MouseEvent('click');
        spyOn(component, 'onResult');
        component.select(ev, stubOption);

        expect(component.onResult).toHaveBeenCalledWith(stubOption);
    });

    it('should call #select() after dropdown item was clicked', () => {
        const ev = new MouseEvent('click');
        const item: HTMLElement = dropdown.querySelector('.sdk-dropdown-item');
        console.log(item, dropdown);

        spyOn(component, 'select');
        item.click();

        expect(component.select).toHaveBeenCalled();
    });
    it('should #ngOnInit() call #initClosingSubscriptions()', () => {
        spyOn(component, 'initClosingSubscriptions');
        expect(component.initClosingSubscriptions).not.toHaveBeenCalled();
        component.ngOnInit();
        expect(component.initClosingSubscriptions).toHaveBeenCalled();
    });

    it('should #ngOnInit() call #initKeydownSubscription()', () => {
        spyOn(component, 'initKeydownSubscription');
        expect(component.initKeydownSubscription).not.toHaveBeenCalled();
        component.ngOnInit();
        expect(component.initKeydownSubscription).toHaveBeenCalled();
    });

    it('should #ngOnInit() call #initClickOutsideSub() if #config.hideBackdrop is exists', () => {
        spyOn(component, 'initClickOutsideSub');
        expect(component.initClickOutsideSub).not.toHaveBeenCalled();
        component.config = {hideBackdrop: true};
        component.ngOnInit();
        expect(component.initClickOutsideSub).toHaveBeenCalled();
    });

    it('should #ngOnInit() do not call #initClickOutsideSub() if #config.hideBackdrop is not exists', () => {
        spyOn(component, 'initClickOutsideSub');
        expect(component.initClickOutsideSub).not.toHaveBeenCalled();
        component.ngOnInit();
        expect(component.initClickOutsideSub).not.toHaveBeenCalled();
    });

    it('should #ngAfterViewInit() call #getDropdownRects()', () => {
        spyOn(component, 'getDropdownRects');
        expect(component.getDropdownRects).not.toHaveBeenCalled();
        component.ngAfterViewInit();
        expect(component.getDropdownRects).toHaveBeenCalled();
    });

    it('should #ngAfterViewInit() call #setDropdownPosition()', () => {
        spyOn(component, 'setDropdownPosition');
        expect(component.setDropdownPosition).not.toHaveBeenCalled();
        component.ngAfterViewInit();
        expect(component.setDropdownPosition).toHaveBeenCalled();
    });

    it('should #sub be closed after component was destroyed', () => {
        expect(component.sub.closed).toBeFalse();
        component.ngOnDestroy();
        expect(component.sub.closed).toBeTrue();
    });

    it('should #currentOption be reset to "undefined" after component was destroyed', () => {
        component.ngOnDestroy();
        expect(component.currentOption).toBeUndefined();
    });

    it('should #highlightedIndex be reset to "undefined" after component was destroyed', () => {
        component.ngOnDestroy();
        expect(component.highlightedIndex).toBeUndefined();
    });
});
