import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDividerComponent } from './demo-divider.component';

describe('DemoDividerComponent', () => {
    let component: DemoDividerComponent;
    let fixture: ComponentFixture<DemoDividerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDividerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
