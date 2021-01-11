import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GlyphsComponent } from './glyphs.component';

describe('GlyphsComponent', () => {
    let component: GlyphsComponent;
    let fixture: ComponentFixture<GlyphsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GlyphsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GlyphsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
