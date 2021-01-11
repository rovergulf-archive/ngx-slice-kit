import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavMenuGroupComponent } from './nav-menu-group.component';

describe('NavMenuGroupComponent', () => {
    let component: NavMenuGroupComponent;
    let fixture: ComponentFixture<NavMenuGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavMenuGroupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavMenuGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
