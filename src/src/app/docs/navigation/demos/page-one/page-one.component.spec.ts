import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPageOneComponent } from './page-one.component';

describe('DemoPageOneComponent', () => {
    let component: DemoPageOneComponent;
    let fixture: ComponentFixture<DemoPageOneComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPageOneComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPageOneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
