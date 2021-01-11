import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemingComponent } from './theming.component';

describe('ThemingComponent', () => {
    let component: ThemingComponent;
    let fixture: ComponentFixture<ThemingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThemingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
