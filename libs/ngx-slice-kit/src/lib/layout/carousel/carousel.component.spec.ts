import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import {IconComponent} from '../../buttons/icon/icon.component';

describe('CarouselComponent', () => {
    let component: CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                CarouselComponent,
                IconComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should', () => {
        spyOn(window, 'clearInterval');

        component.ngOnDestroy();
        expect(window.clearInterval).toHaveBeenCalledWith(component.scrollinterval);
    });
});
