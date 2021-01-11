import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextCardComponent } from './text-card.component';

describe('TextCardComponent', () => {
    let component: TextCardComponent;
    let fixture: ComponentFixture<TextCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TextCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
