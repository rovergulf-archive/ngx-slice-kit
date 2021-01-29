import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDialogPreviewComponent } from './demo-dialog-preview.component';

describe('DemoDialogPreviewComponent', () => {
    let component: DemoDialogPreviewComponent;
    let fixture: ComponentFixture<DemoDialogPreviewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoDialogPreviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoDialogPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
