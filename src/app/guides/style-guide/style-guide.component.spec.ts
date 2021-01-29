import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StyleGuideComponent } from './style-guide.component';

describe('StyleGuideComponent', () => {
    let component: StyleGuideComponent;
    let fixture: ComponentFixture<StyleGuideComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StyleGuideComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StyleGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
