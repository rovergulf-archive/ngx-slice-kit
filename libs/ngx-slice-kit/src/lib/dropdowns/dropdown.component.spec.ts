import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropdownComponent} from './dropdown.component';
import {OptionsService} from './options.service';
import {Renderer2} from '@angular/core';
import {DropdownService} from './dropdown.service';
import {SelectComponent} from './select/select.component';
import {DropdownOptions} from './dropdown.model';
import {OPTIONS1} from '../../../../../src/app/shared/values/dropdowns.values';
import {By} from '@angular/platform-browser';
import {OptionModel} from './dropdown-option.model';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let selectComponent: SelectComponent;
    let selectFixture: ComponentFixture<SelectComponent>;
    let opts: DropdownOptions;
    let optionsService: OptionsService;
    let dropdown: HTMLElement;
    const stubOptionIndex = 0;
    const stubOption = OPTIONS1[stubOptionIndex];

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

    it('should dropdown #config will be set', () => {
        expect(component.config).not.toBeUndefined();
    });

    it('should option html element has .highlighted class if #currentOption is model view of this element', () => {
        const optEl: HTMLElement = dropdown.querySelectorAll('.sdk-dropdown-item')[stubOptionIndex] as HTMLElement;
        component.currentOption = stubOption;

        fixture.detectChanges();
        expect(optEl.classList.contains('highlighted')).toBeTrue();
    });

    it('should #currentOption be undefined after component was destroyed', () => {
        component.currentOption = stubOption;
        fixture.detectChanges();
        component.ngOnDestroy();

        expect(component.currentOption).toBeUndefined();
    });

    it('should #onOptionMouseEnter() set #currentOption and #highlightedIndex properties', () => {
        component.onOptionMouseEnter(stubOption, stubOptionIndex);

        expect(component.currentOption).toEqual(stubOption);
        expect(component.highlightedIndex).toEqual(stubOptionIndex);
    });

    it('should #mouseenter event trigger #onOptionMouseEnter() handler', () => {
        const listElement = fixture.debugElement.queryAll(By.css('.sdk-dropdown-item'))[stubOptionIndex];
        spyOn(component, 'onOptionMouseEnter');
        listElement.triggerEventHandler('mouseenter', {});

        expect(component.onOptionMouseEnter).toHaveBeenCalledWith(stubOption, stubOptionIndex);
    });

    it('should #onOptionMouseLeave() reset #currentOption and #highlightedIndex properties', () => {
        component.onOptionMouseLeave();

        expect(component.currentOption).toBeUndefined();
        expect(component.highlightedIndex).toBeUndefined();
    });

    it('should #mouseleave event trigger #onOptionMouseLeave() handler', () => {
        const listElement = fixture.debugElement.queryAll(By.css('.sdk-dropdown-item'))[stubOptionIndex];
        spyOn(component, 'onOptionMouseLeave');
        listElement.triggerEventHandler('mouseleave', {});

        expect(component.onOptionMouseLeave).toHaveBeenCalled();
    });

    it('should outside click call #onResult() without data', () => {
        const backdropEl = fixture.debugElement.query(By.css('.sdk-dropdown-backdrop'));

        spyOn(component, 'onResult');
        fixture.detectChanges();
        component.ngOnInit();

        backdropEl.triggerEventHandler('click', {});
        expect(component.onResult).toHaveBeenCalledWith();
    });

    it('should dropdown position be set after view init', () => {
        spyOn(component, 'getDropdownRects');
        spyOn(component, 'setDropdownPosition');
        component.ngAfterViewInit();

        expect(component.getDropdownRects).toHaveBeenCalled();
        expect(component.setDropdownPosition).toHaveBeenCalled();
    });

    it('should #setDropdownPosition() correctly set dropdown offset styles', () => {
        const dropdownEl: HTMLElement = dropdown.querySelector('.sdk-dropdown');
        const rects = {
            top: 100,
            width: 900,
            left: 10
        };

        component.rects = rects;
        fixture.detectChanges();
        component.setDropdownPosition();

        expect(dropdownEl.style.top).toEqual(`${rects.top}px`);
        expect(dropdownEl.style.width).toEqual(`${rects.width}px`);
        expect(dropdownEl.style.left).toEqual(`${rects.left}px`);
        expect(dropdownEl.style.opacity).toEqual('1');
    });

    it('should rects width be equal triggerRect width if #config has #filWidth property as true', () => {
        component.config.fitWidth = true;
        fixture.detectChanges();

        expect(component.rects.width).toEqual(component.config.triggerRect.width);
    });

    describe('Test position with #inverted property as true', () => {
        beforeEach(() => {
            const rects = {
                height: undefined
            };

            for (const key in component.config.triggerRect) {
                if (key) {
                    rects[key] = component.config.triggerRect[key];
                }
            }
            rects.height = window.innerHeight;
            component.config.triggerRect = rects as ClientRect;
            component.getDropdownRects();
            fixture.detectChanges();
        });

        it('should dropdown be inverted if window have not enough space', () => {
            expect(component.inverted).toBeTrue();
        });

        it('should dropdown open to top direction', () => {
            const windowHeight: number = window.innerHeight;
            expect(component.rects.bottom).toEqual(windowHeight - component.config.triggerRect.top);
        });
    });

    it('should window scroll event call #onResult() with no data', () => {
        const event = new MouseEvent('scroll');
        spyOn(component, 'onResult');
        window.dispatchEvent(event);

        expect(component.onResult).toHaveBeenCalledWith();
    });

    it('should window resize event call #onResult() with no data', () => {
        const event = new Event('resize');
        spyOn(component, 'onResult');
        window.dispatchEvent(event);

        expect(component.onResult).toHaveBeenCalledWith();
    });

    it('should #sub be empty after component was destroyed', () => {
        component.ngOnInit();
        expect(component.sub.closed).toBeFalse();

        component.ngOnDestroy();
        expect(component.sub.closed).toBeTrue();
    });

    // nextOption() tests

    describe('#nextOption() cases tests', () => {
        beforeEach(() => {
            component.highlightedIndex = undefined;
            component.currentOption = undefined;
            component.optionsService.options = OPTIONS1.map(o => {
                o.selected = false;
                return o;
            });

            fixture.detectChanges();
        });

        it('should #nextOption() correctly change #highlightedIndex and #currentOption if options has selected element', () => {
            const testIdx = 2;
            const newOpts = OPTIONS1.map((o, i) => {
                o.selected = i === testIdx ? true : false;
                return o;
            });

            component.optionsService.options = [...newOpts];

            component.nextOption('up');
            expect(component.highlightedIndex).toEqual(testIdx - 1);
            expect(component.currentOption).toEqual(newOpts[testIdx - 1]);

            component.nextOption('down');
            expect(component.highlightedIndex).toEqual(testIdx);
            expect(component.currentOption).toEqual(newOpts[testIdx]);
        });

        it('should #nextOption("up") highlight last element if list has not selected element', () => {
            component.nextOption('up');
            fixture.detectChanges();

            expect(component.highlightedIndex).toEqual(component.optionsService.options.length - 1);
        });

        it('should #nextOption("down") highlight first element if list has not selected element', () => {
            component.nextOption('down');
            fixture.detectChanges();

            expect(component.highlightedIndex).toEqual(0);
        });

        it('should be set #highlightIndex as 0 and currentOption as options[0] if options.length = 1. By press ArrowUp', () => {
            component.optionsService.options = [stubOption];
            fixture.detectChanges();
            component.nextOption('up');

            expect(component.highlightedIndex).toEqual(0);
            expect(component.currentOption).toEqual(stubOption);
        });

        it('should be set #highlightIndex as 0 and currentOption as options[0] if options.length = 1. By press ArrowDown', () => {
            component.optionsService.options = [stubOption];
            fixture.detectChanges();
            component.nextOption('down');

            expect(component.highlightedIndex).toEqual(0);
            expect(component.currentOption).toEqual(stubOption);
        });

    });

    describe('Test key down subscriptions', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should be called #nextOption() method by click at arrow down with "down" argument', () => {
            const event = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowDown'
            });

            spyOn(component, 'nextOption');
            document.dispatchEvent(event);

            expect(component.nextOption).toHaveBeenCalledWith('down');
        });

        it('should be called #nextOption() method by click at arrow up with "up" argument', () => {
            const event = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowUp'
            });

            spyOn(component, 'nextOption');
            document.dispatchEvent(event);

            expect(component.nextOption).toHaveBeenCalledWith('up');
        });

        it('should be called #onResult() method by click at Enter if component has #currentOption property', () => {
            const event = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, shiftKey: false, key: 'Enter'
            });
            component.currentOption = stubOption;

            spyOn(component, 'onResult');
            document.dispatchEvent(event);

            expect(component.onResult).toHaveBeenCalledWith(stubOption);
        });

        it('should be called #onResult() method without arguments by click at Esc', () => {
            const event = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, shiftKey: false, key: 'Escape'
            });

            spyOn(component, 'onResult');
            document.dispatchEvent(event);

            expect(component.onResult).toHaveBeenCalledWith();
        });
    });

    describe('Test position with #inverted property as false', () => {
        beforeEach(() => {
            const rects = {
                height: undefined
            };

            for (const key in component.config.triggerRect) {
                if (key) {
                    rects[key] = component.config.triggerRect[key];
                }
            }

            rects.height = 0;
            component.config.triggerRect = rects as ClientRect;
            component.getDropdownRects();
            fixture.detectChanges();
        });

        it('should dropdown not be inverted if window have enough space', () => {
            expect(component.inverted).toBeFalse();
        });

        it('should dropdown open to bottom direction', () => {
            expect(component.rects.top).toEqual(component.config.triggerRect.bottom);
        });
    });
});
