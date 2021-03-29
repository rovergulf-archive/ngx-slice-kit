import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {CarouselComponent} from './carousel.component';
import {IconComponent} from '../../buttons/icon/icon.component';
import {Component, DebugElement, Input} from '@angular/core';
import {SlideComponent} from './slide/slide.component';

describe('CarouselComponent', () => {
    let component: CarouselComponent;
    let fixture: ComponentFixture<TestComponent>;
    let carouselDe: DebugElement;
    let carouselEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                CarouselComponent,
                SlideComponent,
                IconComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        carouselDe = fixture.debugElement;
        carouselEl = carouselDe.children[0].nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #ngOnDestroy unsubscribe from #sub', () => {
        fixture.detectChanges();
        spyOn(component.sub, 'unsubscribe');

        component.ngOnDestroy();
        expect(component.sub.unsubscribe).toHaveBeenCalled();
    });

    it('should be subscription after component was init', () => {
        component.ngOnInit();
        expect(component.sub).toBeTruthy();
    });

    it('should default properties be correct', () => {
        expect(component.dots).toBeFalse();
        expect(component.infinity).toBeFalse();
        expect(component.pauseByHover).toBeFalse();
        expect(component.arrows).toBeTrue();
        expect(component.slidesToScroll).toEqual(1);
        expect(component.slidesToShow).toEqual(1);
        expect(component.timeout).toEqual(5000);
        expect(component.offset).toEqual(0);
        expect(component.slidesArr).toEqual([]);
        expect(component.activeSlideIndex).toEqual(0);
        expect(component.curCarouselPosition).toEqual(0);
        expect(component.pagePenalty).toEqual(0);
    });

    it('should subscription call #grab method on pointerdown event', fakeAsync(() => {
        spyOn(component, 'grab');
        const event = new PointerEvent('pointerdown');

        component.ngOnInit();
        component.carouselRow.nativeElement.dispatchEvent(event);

        tick(1000);
        expect(component.grab).toHaveBeenCalled();
    }));

    it('should', () => {
        fixture.detectChanges();
        component.ngAfterContentInit();

        expect(component.slidesArr.length).toEqual(2); // 2 slides
        expect(component.slideWidth).toEqual(component.carouselWrapper.nativeElement.offsetWidth); // because 1 slide to show by default
    });

    it('should #isViewInit be true after view was init', () => {
        fixture.detectChanges();
        component.ngAfterViewInit();

        expect(component.isViewInit).toBeTrue();
    });

    it('should #dotsCount be correct', () => {
        fixture.detectChanges();
        expect(component.dotsCount).toEqual(2);
        component.slidesToScroll = 2;
        fixture.detectChanges();
        expect(component.dotsCount).toEqual(1);
    });

    it('should #checkSlidesToScroll do nothing if #slidesToScroll is <= #slidesArr.length', () => {
        fixture.detectChanges();
        component.checkSlidesToScroll();

        expect(component.slidesToScroll).toEqual(1);
    });

    it('should #checkSlidesToScroll set #slidesToScroll as #slidesArr.length if it greater', () => {
        component.slidesToScroll = 10;
        fixture.detectChanges();
        component.checkSlidesToScroll();

        expect(component.slidesToScroll).toEqual(2);
    });

    it('should #clone return clone of node and add .sdk-slice--clone class to it', () => {
        fixture.detectChanges();
        const el: HTMLElement = component.slidesArr[0].el.nativeElement;
        expect(component.cloneNode(component.slidesArr[0])).toHaveClass('sdk-slide--clone');
        expect(component.cloneNode(component.slidesArr[0])).toHaveClass('sdk-slide');
        expect(component.cloneNode(component.slidesArr[0])).not.toEqual(el);
    });

    it('should #createClones put to #lastPageClones & #firstPageClones arr slides from head and tail of #slidesArr', () => {
        fixture.detectChanges();
        component.createClones();

        expect(component.lastPageClones.length).toEqual(1);
        expect(component.firstPageClones.length).toEqual(1);
    });

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

});

@Component({
    template: `
        <sdk-carousel>
            <sdk-slide>
                <div>
                    Acca
                </div>
            </sdk-slide>
            <sdk-slide>
                <div>
                    Dacca
                </div>
            </sdk-slide>
        </sdk-carousel>`,
})
class TestComponent {
}
