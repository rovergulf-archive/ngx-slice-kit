import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoBottomSheetComponent } from './demo-bottom-sheet.component';

describe('DemoBottomSheetComponent', () => {
    let component: DemoBottomSheetComponent;
    let fixture: ComponentFixture<DemoBottomSheetComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoBottomSheetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoBottomSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
