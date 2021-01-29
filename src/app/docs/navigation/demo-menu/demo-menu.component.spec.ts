import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoMenuComponent } from './demo-menu.component';

describe('DemoMenuComponent', () => {
    let component: DemoMenuComponent;
    let fixture: ComponentFixture<DemoMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoMenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
