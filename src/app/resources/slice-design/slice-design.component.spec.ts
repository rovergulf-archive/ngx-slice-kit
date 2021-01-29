import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SliceDesignComponent } from './slice-design.component';

describe('SliceDesignComponent', () => {
    let component: SliceDesignComponent;
    let fixture: ComponentFixture<SliceDesignComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SliceDesignComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliceDesignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
