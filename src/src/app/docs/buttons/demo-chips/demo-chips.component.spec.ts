import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoChipsComponent } from './demo-chips.component';

describe('DemoChipsComponent', () => {
    let component: DemoChipsComponent;
    let fixture: ComponentFixture<DemoChipsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoChipsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
