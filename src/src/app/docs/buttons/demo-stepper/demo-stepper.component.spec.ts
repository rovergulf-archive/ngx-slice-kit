import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoStepperComponent } from './demo-stepper.component';

describe('DemoStepperComponent', () => {
    let component: DemoStepperComponent;
    let fixture: ComponentFixture<DemoStepperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoStepperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoStepperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
