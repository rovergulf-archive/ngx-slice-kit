import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoCheckboxComponent } from './demo-checkbox.component';

describe('DemoCheckboxComponent', () => {
    let component: DemoCheckboxComponent;
    let fixture: ComponentFixture<DemoCheckboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoCheckboxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
