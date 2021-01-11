import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextStylesComponent } from './text-styles.component';

describe('TextStylesComponent', () => {
    let component: TextStylesComponent;
    let fixture: ComponentFixture<TextStylesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TextStylesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextStylesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
