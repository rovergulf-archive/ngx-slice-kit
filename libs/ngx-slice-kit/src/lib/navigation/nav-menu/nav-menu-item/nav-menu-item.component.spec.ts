import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavMenuItemComponent } from './nav-menu-item.component';

describe('NavMenuItemComponent', () => {
    let component: NavMenuItemComponent;
    let fixture: ComponentFixture<NavMenuItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavMenuItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavMenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
