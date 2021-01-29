import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDatepickerComponent } from './demo-datepicker.component';

describe('DemoDatepickerComponent', () => {
    let component: DemoDatepickerComponent;
    let fixture: ComponentFixture<DemoDatepickerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDatepickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDatepickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
