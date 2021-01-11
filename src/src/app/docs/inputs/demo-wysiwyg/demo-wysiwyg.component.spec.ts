import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoWysiwygComponent } from './demo-wysiwyg.component';

describe('DemoWysiwygComponent', () => {
    let component: DemoWysiwygComponent;
    let fixture: ComponentFixture<DemoWysiwygComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoWysiwygComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoWysiwygComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
