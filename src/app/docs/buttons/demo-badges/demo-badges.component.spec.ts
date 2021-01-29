import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoBadgesComponent } from './demo-badges.component';

describe('DemoBadgesComponent', () => {
    let component: DemoBadgesComponent;
    let fixture: ComponentFixture<DemoBadgesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoBadgesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoBadgesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
