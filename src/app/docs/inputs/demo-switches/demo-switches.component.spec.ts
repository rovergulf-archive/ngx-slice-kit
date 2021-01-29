import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoSwitchesComponent } from './demo-switches.component';

describe('DemoSwitchesComponent', () => {
    let component: DemoSwitchesComponent;
    let fixture: ComponentFixture<DemoSwitchesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSwitchesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSwitchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
