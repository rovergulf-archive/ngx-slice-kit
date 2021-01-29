import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoRippleComponent } from './demo-ripple.component';

describe('DemoRippleComponent', () => {
    let component: DemoRippleComponent;
    let fixture: ComponentFixture<DemoRippleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoRippleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoRippleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
