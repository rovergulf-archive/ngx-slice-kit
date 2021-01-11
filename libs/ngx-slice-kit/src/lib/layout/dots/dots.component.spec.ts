import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DotsComponent } from './dots.component';

describe('DotsComponent', () => {
    let component: DotsComponent;
    let fixture: ComponentFixture<DotsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DotsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DotsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
