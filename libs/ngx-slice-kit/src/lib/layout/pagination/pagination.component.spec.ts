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

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

});
