import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {IconComponent} from '../../buttons/icon/icon.component';
import {DebugElement} from '@angular/core';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let pagDe: DebugElement;
    let pagEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaginationComponent,
                IconComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        pagDe = fixture.debugElement;
        pagEl = pagDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #getPageCount return (count of items / items per page)', () => {
        component.count = 20;
        component.limit = 5;
        fixture.detectChanges();
        const expectedPageCount = component.count / component.limit; // 4;
        const res = component.getPageCount();
        fixture.detectChanges();

        expect(res).toEqual(expectedPageCount);
    });

    it('should #ngOnInit call #getPageCount method to set #pageCount', () => {
        spyOn(component, 'getPageCount');
        component.ngOnInit();

        expect(component.getPageCount).toHaveBeenCalled();
    });

    it('should #pageCount be equal (count of items / items per page) after component was init', () => {
        component.count = 20;
        component.limit = 5;
        fixture.detectChanges();
        const expectedPageCount = component.count / component.limit; // 4;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.pageCount).toEqual(expectedPageCount);
    });

    it('should #small be false by default and element has no "small" class', () => {
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator');

        expect(el).toHaveClass('sdk-paginator--default');
        expect(el).not.toHaveClass('sdk-paginator--small');
    });

    it('should element has .sdk-paginator--small class if #small is true', () => {
        component.small = true;
        fixture.detectChanges();
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator');

        expect(el).not.toHaveClass('sdk-paginator--default');
        expect(el).toHaveClass('sdk-paginator--small');
    });

    it('should #mouseenter/mouseleave events works correctly on left/right buttons', () => {
        const eventEnter = new MouseEvent('mouseenter');
        const eventLeave = new MouseEvent('mouseleave');
        const elLeft: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left');
        const elRight: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right');

        elLeft.dispatchEvent(eventEnter);
        expect(component.leftArrowHovered).toBeTrue();
        elLeft.dispatchEvent(eventLeave);
        expect(component.leftArrowHovered).toBeFalse();

        elRight.dispatchEvent(eventEnter);
        expect(component.rightArrowHovered).toBeTrue();
        elRight.dispatchEvent(eventLeave);
        expect(component.rightArrowHovered).toBeFalse();
    });

    it('should left/right button icons have primary color if they are not hovered', () => {
        component.rightArrowHovered = false;
        component.leftArrowHovered = false;
        fixture.detectChanges();
        const elLeft: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left sdk-icon');
        const elRight: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right sdk-icon');
        const attrLeft = elLeft.getAttribute('ng-reflect-color');
        const attrRight = elRight.getAttribute('ng-reflect-color');

        expect(attrLeft).toEqual('var(--primary-rgb)');
        expect(attrRight).toEqual('var(--primary-rgb)');
    });

    it('should left/right button icons have #fff color if they are hovered', () => {
        component.rightArrowHovered = true;
        component.leftArrowHovered = true;
        fixture.detectChanges();
        const elLeft: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left sdk-icon');
        const elRight: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right sdk-icon');
        const attrLeft = elLeft.getAttribute('ng-reflect-color');
        const attrRight = elRight.getAttribute('ng-reflect-color');

        expect(attrLeft).toEqual('var(--primary-rgb-text)');
        expect(attrRight).toEqual('var(--primary-rgb-text)');
    });

    it('should #pageChange do nothing if page argument is equal current #page property', () => {
        spyOn(component, 'createPageArray');
        spyOn(component.changed, 'emit');
        const dummyPage = 5;
        component.page = dummyPage;

        fixture.detectChanges();
        component.pageChange(dummyPage);
        expect(component.createPageArray).not.toHaveBeenCalled();
        expect(component.changed.emit).not.toHaveBeenCalled();
    });

    it('should #pageChange set #page property, emit #changed event and call #createPageArray method if page argument is not equal #page property', () => {
        spyOn(component, 'createPageArray');
        spyOn(component.changed, 'emit');
        const dummyPage = 5;

        fixture.detectChanges();
        component.pageChange(dummyPage);
        expect(component.page).toEqual(dummyPage);
        expect(component.createPageArray).toHaveBeenCalled();
        expect(component.changed.emit).toHaveBeenCalled();
    });

    it('should #getPages() return correct page array if count of pages <= 5', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 1;

        component.ngOnInit();
        fixture.detectChanges();
        expect(component.getPages()).toEqual([{value: 1}, {value: 2}, {value: 3}]);
    });

    it('should count of page elements be equal #pageCount', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 1;
        component.ngOnInit();
        fixture.detectChanges();
        const els: NodeListOf<HTMLElement> = pagEl.querySelectorAll('.sdk-paginator__page .sdk-paginator__btn');

        expect(els.length).toEqual(3); // 15 / 5
    });

    it('should right button be disabled if last page is active', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 3;
        component.ngOnInit();
        fixture.detectChanges();
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right');

        expect(el.hasAttribute('disabled')).toBeTrue();
    });

    it('should left button be disabled if first page is active', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 1;
        component.ngOnInit();
        fixture.detectChanges();
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left');

        expect(el.hasAttribute('disabled')).toBeTrue();
    });

    it('should right button not be disabled if last page is not active', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 2;
        component.ngOnInit();
        fixture.detectChanges();
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right');

        expect(el.hasAttribute('disabled')).not.toBeTrue();
    });

    it('should left button not be disabled if first page is not active', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 2;
        component.ngOnInit();
        fixture.detectChanges();
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left');

        expect(el.hasAttribute('disabled')).not.toBeTrue();
    });

    it('should click on left arrow button call #pageChange method with (page - 1) as value', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 2;
        component.ngOnInit();
        fixture.detectChanges();
        spyOn(component, 'pageChange');
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--left');

        el.click();

        expect(component.pageChange).toHaveBeenCalledWith(1);
    });

    it('should click on right arrow button call #pageChange method with (page + 1) as value', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 2;
        component.ngOnInit();
        fixture.detectChanges();
        spyOn(component, 'pageChange');
        const el: HTMLElement = pagEl.querySelector('.sdk-paginator__arrow--right');

        el.click();

        expect(component.pageChange).toHaveBeenCalledWith(3);
    });

    it('should click on page element call #pageChange method with page value as argument', () => {
        component.limit = 5;
        component.count = 15;
        component.page = 2;
        component.ngOnInit();
        fixture.detectChanges();
        spyOn(component, 'pageChange');
        const el: HTMLElement = pagEl.querySelectorAll('.sdk-paginator__page .sdk-paginator__btn')[1] as HTMLElement; // second page

        el.click();

        expect(component.pageChange).toHaveBeenCalledWith(2);
    });

    describe('#createPageArray() tests', () => {
        const limit = 5;
        const itemCount = 50;
        const pageCount = Math.ceil(itemCount / limit);
        const page = 6;
        const dummyA = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: '...', disabled: true},
            {value: pageCount}
        ];
        const dummyB = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: 4},
            {value: '...', disabled: true},
            {value: pageCount}
        ];
        const dummyC = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: 4},
            {value: '...', disabled: true},
            {value: pageCount}
        ];
        const dummyD = [
            {value: 1},
            {value: '...', disabled: true},
            {value: pageCount - 3},
            {value: pageCount - 2},
            {value: pageCount - 1},
            {value: pageCount}
        ];
        const dummyE = [
            {value: 1},
            {value: '...', disabled: true},
            {value: pageCount - 3},
            {value: pageCount - 2},
            {value: pageCount - 1},
            {value: pageCount}
        ];
        const dummyF = [
            {value: 1},
            {value: '...', disabled: true},
            {value: pageCount - 2},
            {value: pageCount - 1},
            {value: pageCount}
        ];
        const dummyG = [
            {value: 1},
            {value: '...', disabled: true},
            {value: page - 1},
            {value: page},
            {value: page + 1},
            {value: '...', disabled: true},
            {value: pageCount}
        ];

        beforeEach(() => {
            component.limit = 5;
            component.count = 50;
        });

        it('test pagination case #1', () => {
            component.page = 1;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyA);
        });

        it('test pagination case #2', () => {
            component.page = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyB);
        });

        it('test pagination case #3', () => {
            component.page = 3;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyC);
        });

        it('test pagination case #4', () => {
            component.page = pageCount - 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyD);
        });

        it('test pagination case #5', () => {
            component.page = pageCount - 1;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyE);
        });

        it('test pagination case #6', () => {
            component.page = pageCount;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyF);
        });

        it('test pagination case #7', () => {
            component.page = page;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.createPageArray()).toEqual(dummyG);
        });

        it('should #getPages() return correct page array', () => {
            component.page = 1;
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.getPages()).toEqual(dummyA);
        });
    });
});
