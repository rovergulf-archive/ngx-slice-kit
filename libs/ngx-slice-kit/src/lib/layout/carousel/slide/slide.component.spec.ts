import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideComponent } from './slide.component';

describe('SlideComponent', () => {
    let component: SlideComponent;
    let fixture: ComponentFixture<SlideComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SlideComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SlideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
