import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPageTwoComponent } from './page-two.component';

describe('DemoPageTwoComponent', () => {
    let component: DemoPageTwoComponent;
    let fixture: ComponentFixture<DemoPageTwoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPageTwoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPageTwoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
