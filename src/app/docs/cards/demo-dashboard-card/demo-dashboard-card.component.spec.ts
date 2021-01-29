import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDashboardCardComponent } from './demo-dashboard-card.component';

describe('DemoDashboardCardComponent', () => {
    let component: DemoDashboardCardComponent;
    let fixture: ComponentFixture<DemoDashboardCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDashboardCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDashboardCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
