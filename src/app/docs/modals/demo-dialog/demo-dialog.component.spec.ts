import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDialogComponent } from './demo-dialog.component';

describe('DemoDialogComponent', () => {
    let component: DemoDialogComponent;
    let fixture: ComponentFixture<DemoDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
