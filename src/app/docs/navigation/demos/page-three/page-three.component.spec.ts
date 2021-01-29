import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPageThreeComponent } from './page-three.component';

describe('DemoPageThreeComponent', () => {
    let component: DemoPageThreeComponent;
    let fixture: ComponentFixture<DemoPageThreeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPageThreeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPageThreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
