import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDropdownComponent } from './demo-dropdown.component';

describe('DemoDropdownComponent', () => {
    let component: DemoDropdownComponent;
    let fixture: ComponentFixture<DemoDropdownComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDropdownComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
