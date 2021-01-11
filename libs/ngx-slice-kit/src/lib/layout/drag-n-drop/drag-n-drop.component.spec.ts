import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DragNDropComponent } from './drag-n-drop.component';

describe('DragNDropComponent', () => {
    let component: DragNDropComponent;
    let fixture: ComponentFixture<DragNDropComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DragNDropComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DragNDropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
