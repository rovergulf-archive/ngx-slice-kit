import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPaginationComponent } from './demo-pagination.component';

describe('DemoPaginationComponent', () => {
    let component: DemoPaginationComponent;
    let fixture: ComponentFixture<DemoPaginationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoPaginationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
