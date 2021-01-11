import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPageFiveComponent } from './page-five.component';

describe('DemoPageFiveComponent', () => {
    let component: DemoPageFiveComponent;
    let fixture: ComponentFixture<DemoPageFiveComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPageFiveComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPageFiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
