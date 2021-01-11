import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavTabsComponent } from './nav-tabs.component';

describe('NavTabsComponent', () => {
    let component: NavTabsComponent;
    let fixture: ComponentFixture<NavTabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavTabsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
