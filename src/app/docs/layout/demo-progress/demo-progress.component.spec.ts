import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoProgressComponent } from './demo-progress.component';

describe('DemoProgressComponent', () => {
    let component: DemoProgressComponent;
    let fixture: ComponentFixture<DemoProgressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoProgressComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoProgressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
