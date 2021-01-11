import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoNavtabsComponent } from './demo-navtabs.component';

describe('DemoNavtabsComponent', () => {
    let component: DemoNavtabsComponent;
    let fixture: ComponentFixture<DemoNavtabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoNavtabsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoNavtabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
