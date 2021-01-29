import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoButtonsComponent } from './demo-buttons.component';

describe('DemoButtonsComponent', () => {
    let component: DemoButtonsComponent;
    let fixture: ComponentFixture<DemoButtonsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoButtonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
