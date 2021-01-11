import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImagesGridComponent } from './images-grid.component';

describe('ImagesGridComponent', () => {
    let component: ImagesGridComponent;
    let fixture: ComponentFixture<ImagesGridComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ImagesGridComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImagesGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
