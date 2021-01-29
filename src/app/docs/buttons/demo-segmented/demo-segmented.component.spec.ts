import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoSegmentedComponent } from './demo-segmented.component';

describe('DemoSegmentedComponent', () => {
    let component: DemoSegmentedComponent;
    let fixture: ComponentFixture<DemoSegmentedComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSegmentedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSegmentedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
