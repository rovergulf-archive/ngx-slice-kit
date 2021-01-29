import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MdUsageComponent } from './md-usage.component';

describe('MdUsageComponent', () => {
    let component: MdUsageComponent;
    let fixture: ComponentFixture<MdUsageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MdUsageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MdUsageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
