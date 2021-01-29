import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoSidenavComponent } from './demo-sidenav.component';

describe('DemoSidenavComponent', () => {
    let component: DemoSidenavComponent;
    let fixture: ComponentFixture<DemoSidenavComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSidenavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
