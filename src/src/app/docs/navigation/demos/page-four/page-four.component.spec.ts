import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPageFourComponent } from './page-four.component';

describe('DemoPageFourComponent', () => {
    let component: DemoPageFourComponent;
    let fixture: ComponentFixture<DemoPageFourComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPageFourComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPageFourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
