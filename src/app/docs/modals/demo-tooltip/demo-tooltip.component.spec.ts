import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoTooltipComponent } from './demo-tooltip.component';

describe('DemoTooltipComponent', () => {
    let component: DemoTooltipComponent;
    let fixture: ComponentFixture<DemoTooltipComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoTooltipComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
