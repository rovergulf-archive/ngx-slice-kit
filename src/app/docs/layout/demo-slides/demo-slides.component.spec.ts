import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoSlidesComponent } from './demo-slides.component';

describe('DemoSlidesComponent', () => {
    let component: DemoSlidesComponent;
    let fixture: ComponentFixture<DemoSlidesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSlidesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSlidesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
