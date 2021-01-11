import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WysiwygComponent } from './wysiwyg.component';

describe('WysiwygComponent', () => {
    let component: WysiwygComponent;
    let fixture: ComponentFixture<WysiwygComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [WysiwygComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WysiwygComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
