import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {CarouselComponent} from './carousel.component';
import {IconComponent} from '../../buttons/icon/icon.component';
import {Component, DebugElement} from '@angular/core';
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
            ],
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

    it('should #setSlideStyles set each slide width', () => {
        fixture.detectChanges();
        component.setSlideStyles();
        const el = component.slidesArr[0].el.nativeElement;

        expect(el.style.padding).toEqual(``);
        expect(el.style.width).toEqual(`${component.carouselWrapper.nativeElement.offsetWidth}px`);
    });

    it('should #setSlideStyles set each slide padding if #offset is truthy', () => {
        component.offset = 12;
        fixture.detectChanges();
        component.setSlideStyles();
        const el = component.slidesArr[0].el.nativeElement;

        expect(el.style.padding).toEqual(`${12}px`);
    });

    it('should last clones be insert before and first clones be insert after', () => {
        fixture.detectChanges();
        component.createClones();
        component.insertClones();

        const firstClone = component.carouselRow.nativeElement.children[0];
        const lastClone = component.carouselRow.nativeElement.children[3];

        expect(lastClone.textContent).toEqual('Acca');
        expect(lastClone).toHaveClass('sdk-slide--clone');
        expect(firstClone.textContent).toEqual('Dacca');
        expect(firstClone).toHaveClass('sdk-slide--clone');
    });

    it('should be deleted all clone slides after #removeClones', () => {
        fixture.detectChanges();
        component.createClones();
        component.insertClones();
        component.removeClones();

        expect(component.carouselRow.nativeElement.children.length).toEqual(2); // 2 slides
    });

    it('should #updateSlider call #setSlideStyles & #checkSLidesToScroll', () => {
        spyOn(component, 'setSlideStyles');
        spyOn(component, 'checkSlidesToScroll');
        component.updateSlider();

        expect(component.setSlideStyles).toHaveBeenCalled();
        expect(component.checkSlidesToScroll).toHaveBeenCalled();
    });

    it('should #updateSlider set #carouserWrapperRects/slideWidth/scrollStep/carouselRowRects properties', () => {
        fixture.detectChanges();
        component.ngAfterViewInit();
        component.updateSlider();

        expect(component.carouselWrapperRects).toEqual(component.carouselWrapper.nativeElement.getBoundingClientRect());
        expect(component.slideWidth).toEqual(component.carouselWrapper.nativeElement.offsetWidth);
        expect(component.scrollStep).toEqual(component.slideWidth);
        expect(component.carouselRowRects).toEqual(component.carouselRow.nativeElement.getBoundingClientRect());
    });

    it('should not be created slide clones if #infinity is false', () => {
        component.infinity = false;
        spyOn(component, 'removeClones');
        spyOn(component, 'createClones');
        spyOn(component, 'insertClones');
        spyOn(component, 'updatePosition');

        fixture.detectChanges();
        component.updateSlider();

        expect(component.removeClones).not.toHaveBeenCalled();
        expect(component.createClones).not.toHaveBeenCalled();
        expect(component.insertClones).not.toHaveBeenCalled();
        expect(component.updatePosition).not.toHaveBeenCalled();
    });

    it('should be created slide clones if #infinity is true', () => {
        component.infinity = true;
        spyOn(component, 'createClones');
        spyOn(component, 'insertClones');
        spyOn(component, 'updatePosition');

        fixture.detectChanges();
        component.updateSlider();

        expect(component.createClones).toHaveBeenCalled();
        expect(component.insertClones).toHaveBeenCalled();
        expect(component.updatePosition).toHaveBeenCalled();
    });

    it('should clones be deleted if they are exist before they will be recreate', () => {
        component.infinity = true;
        spyOn(component, 'removeClones');

        fixture.detectChanges();
        component.createClones();
        component.updateSlider();

        expect(component.removeClones).toHaveBeenCalled();
    });

    it('should #pagePenalty be equal #scrollStep after #updateSlider was called and if #infinity is true', () => {
        component.infinity = true;
        fixture.detectChanges();
        component.updateSlider();

        expect(component.pagePenalty).toEqual(component.scrollStep);
    });

    it('should #carouselRow element has transform style equal translateX with #curCarouselPosition px', () => {
        component.infinity = true;
        fixture.detectChanges();
        component.updateSlider();

        expect(component.carouselRow.nativeElement.style.transform).toEqual(`translateX(${component.curCarouselPosition}px)`);
    });

    it('should be called #windowResizeHandler on window resize event', () => {
        spyOn(component, 'windowResizeHandler');
        const event = new Event('resize');
        fixture.detectChanges();

        window.dispatchEvent(event);

        expect(component.windowResizeHandler).toHaveBeenCalled();
    });

    it('should #windowResizeHandler call #updateSlider if #carouselWrapper width is not equal #carouselWrapperRects width', () => {
        fixture.detectChanges();
        component.updateSlider();
        component.carouselWrapper.nativeElement.style.width = '50px';
        fixture.detectChanges();
        spyOn(component, 'updateSlider');

        component.windowResizeHandler();

        expect(component.updateSlider).toHaveBeenCalled();
    });

    it('should #windowResizeHandler do not call #updateSlider if #carouselWrapper width is equal #carouselWrapperRects width', () => {
        fixture.detectChanges();
        component.updateSlider();
        fixture.detectChanges();
        spyOn(component, 'updateSlider');

        component.windowResizeHandler();

        expect(component.updateSlider).not.toHaveBeenCalled();
    });

    it('should be arrows elements if #arrows is true', () => {
        component.arrows = true;
        fixture.detectChanges();

        const arrows: NodeList = carouselEl.querySelectorAll('.sdk-carousel__arrow');

        expect(arrows.length).toEqual(2);
    });

    it('should be no arrows elements if #arrows is true', () => {
        component.arrows = false;
        fixture.detectChanges();

        const arrows: NodeList = carouselEl.querySelectorAll('.sdk-carousel__arrow');

        expect(arrows.length).toEqual(0);
    });

    it('should click on left arrow call #move method with "back" as argument', () => {
        component.arrows = true;
        spyOn(component, 'move');
        fixture.detectChanges();

        const arrow: HTMLElement = carouselEl.querySelector('.sdk-carousel__arrow--left');
        arrow.click();

        expect(component.move).toHaveBeenCalledWith('back');
    });

    it('should click on right arrow call #move method with "forward" as argument', () => {
        component.arrows = true;
        spyOn(component, 'move');
        fixture.detectChanges();

        const arrow: HTMLElement = carouselEl.querySelector('.sdk-carousel__arrow--right');
        arrow.click();

        expect(component.move).toHaveBeenCalledWith('forward');
    });

    it('should be no dots element if #dots is false', () => {
        component.dots = false;
        fixture.detectChanges();

        const dots: HTMLElement = carouselEl.querySelector('.sdk-carousel__dots');

        expect(dots).toBeFalsy();
    });

    it('should be dots element if #dots is true', () => {
        component.dots = true;
        fixture.detectChanges();

        const dots: HTMLElement = carouselEl.querySelector('.sdk-carousel__dots');

        expect(dots).toBeTruthy();
    });

    it('should #pointerUpHandler do nothing if #isGrabbed is false', () => {
        spyOn(component, 'pointerUpHandler');
        spyOn(component, 'move');
        spyOn(component, 'animate');
        component.isGrabbed = false;
        fixture.detectChanges();

        const event = new MouseEvent('pointerup');

        carouselEl.dispatchEvent(event);
        expect(component.pointerUpHandler).toHaveBeenCalled();
        expect(component.move).not.toHaveBeenCalled();
        expect(component.animate).not.toHaveBeenCalled();
    });

    it('should #isGrabbed be false after #pointerUpHandler', () => {
        component.isGrabbed = true;
        fixture.detectChanges();

        const event = new MouseEvent('pointerup');

        carouselEl.dispatchEvent(event);
        expect(component.isGrabbed).toBeFalse();
    });

    it('should #pointerUpHandler call #move method with "forward" as argument if #scrollOffset is less then (#curCarouselPosition - 100)', () => {
        spyOn(component, 'move');
        component.isGrabbed = true;
        component.scrollOffset = -32000;
        fixture.detectChanges();

        const event = new MouseEvent('pointerup');

        carouselEl.dispatchEvent(event);
        expect(component.move).toHaveBeenCalledWith('forward');
    });

    it('should #pointerUpHandler call #move method with "back" as argument if #scrollOffset is greater then (#curCarouselPosition + 100)', () => {
        spyOn(component, 'move');
        component.isGrabbed = true;
        component.scrollOffset = 32000;
        fixture.detectChanges();

        const event = new MouseEvent('pointerup');

        carouselEl.dispatchEvent(event);
        expect(component.move).toHaveBeenCalledWith('back');
    });

    it(`should #pointerUpHandler call #animate method with #curCarouselPosition as argument if
    #scrollOffset >= (curCarouselPosition - 100) or
    #scrollOffset <= (curCarouselPosition + 100)`, () => {
        spyOn(component, 'animate');
        component.isGrabbed = true;
        component.scrollOffset = 0;
        component.curCarouselPosition = 0;
        fixture.detectChanges();

        const event = new MouseEvent('pointerup');

        carouselEl.dispatchEvent(event);
        expect(component.animate).toHaveBeenCalledWith(component.curCarouselPosition);
    });

    it('should #grab method set #isGrabbed as true and set #scrollStartX as event.clientX', () => {
        component.isGrabbed = false;
        const event = new PointerEvent('pointerdown', {clientX: 777});
        fixture.detectChanges();

        component.grab(event);
        expect(component.isGrabbed).toBeTrue();
        expect(component.scrollStartX).toEqual(777);
    });

    it('should #pointerMoveHandler set #scrollOffset and carouselRow transform style if #isGrabbed is true', () => {
        const event = new PointerEvent('pointermove', {clientX: 777});
        component.isGrabbed = true;
        component.curCarouselPosition = 0;
        component.scrollStartX = 0;
        fixture.detectChanges();

        component.pointerMoveHandler(event);
        expect(component.scrollOffset).toEqual(777);
        expect(component.carouselRow.nativeElement.style.transform).toEqual(`translateX(${777}px)`);

    });

    it('should #pointerMoveHandler do not set #scrollOffset and carouselRow transform style if #isGrabbed is false', () => {
        const event = new PointerEvent('pointermove', {clientX: 777});
        component.isGrabbed = false;
        component.curCarouselPosition = 0;
        component.scrollStartX = 0;
        fixture.detectChanges();

        component.pointerMoveHandler(event);
        expect(component.scrollOffset).not.toEqual(777);
        expect(component.carouselRow.nativeElement.style.transform).not.toEqual(`translateX(${777}px)`);
    });

    it('should #pointerMoveHandler to have been called on pointermove event', () => {
        const event = new PointerEvent('pointermove', {clientX: 777});
        spyOn(component, 'pointerMoveHandler');
        fixture.detectChanges();

        carouselEl.dispatchEvent(event);
        expect(component.pointerMoveHandler).toHaveBeenCalled();
    });

    it('should #updatePosition set #isScrolling as false, remove transition style from carouselRow element, set #carouselRowRects', (done) => {
        fixture.detectChanges();
        component.updatePosition();

        setTimeout(() => {
            expect(component.carouselRowRects).toEqual(component.carouselRow.nativeElement.getBoundingClientRect());
            expect(component.carouselRow.nativeElement.style.transition).toBeFalsy();
            expect(component.isScrolling).toBeFalse();
            done();
        }, 600);
    });

    it('should #selectSlide set #activeSlideIndex', () => {
        fixture.detectChanges();

        component.selectSlide(0);
        expect(component.activeSlideIndex).toEqual(0);

        component.selectSlide(1);
        expect(component.activeSlideIndex).toEqual(1);
    });

    it('should #selectSlide call #animate with #curCarouselPosition', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.selectSlide(0);

        expect(component.animate).toHaveBeenCalledWith(component.curCarouselPosition);
    });

    it('should #selectSlide set #curCarouselPosition', () => {
        component.slideWidth = 1;
        component.slidesToScroll = 1;
        component.pagePenalty = 1;
        fixture.detectChanges();
        component.selectSlide(0);

        expect(component.curCarouselPosition).toEqual(-1); // -(activeSlideIndex(0) * slideWidth(1) * slidesToScroll(1) - 0) - pagePenalty(1)
    });

    it('should #selectSlide set #curCarouselPosition. If dotsCount === (activeSlideIndex + 1)', () => {
        fixture.detectChanges();
        component.slideWidth = 1;
        component.slidesToScroll = 1;
        component.pagePenalty = 1;
        component.selectSlide(1);

        expect(component.curCarouselPosition).toEqual(-2); // -(activeSlideIndex(1) * slideWidth(1) * slidesToScroll(1) - 0) - pagePenalty(1)
    });

    it('should #animation set #isScrolling as true', () => {
        const position = 999;
        fixture.detectChanges();
        component.animate(position);

        expect(component.isScrolling).toBeTrue();
    });

    it('should #animation set carouselRow transition & transform styles', () => {
        const position = 999;
        fixture.detectChanges();
        component.animate(position);

        expect(component.carouselRow.nativeElement.style.transition).toEqual('all 400ms ease 0s');
        expect(component.carouselRow.nativeElement.style.transform).toEqual(`translateX(${position}px)`);
    });

    it('should #animation call #updatePosition method', () => {
        spyOn(component, 'updatePosition');
        const position = 999;
        fixture.detectChanges();
        component.animate(position);

        expect(component.updatePosition).toHaveBeenCalled();
    });

    it('should #animation set #activeSlideIndex as 0 if #activeSlideIndex + 1 is greater then #dotsCount', () => {
        const position = 999;
        component.activeSlideIndex = 2;
        fixture.detectChanges();
        component.animate(position);

        expect(component.activeSlideIndex).toEqual(0);
    });

    it('should #animation set #curCarouselPosition & carouselRow transform style. if #activeSlideIndex + 1 > #dotsCount', (done) => {
        fixture.detectChanges();
        const position = 999;
        component.activeSlideIndex = 2;
        component.slideWidth = 1;
        component.animate(position);

        setTimeout(() => {
            expect(component.curCarouselPosition).toEqual(-1); // -(slidesToScroll(1) * slideWidth(1))
            expect(component.carouselRow.nativeElement.style.transform).toEqual(`translateX(-1px)`);
            done();
        }, 550);
    });

    it('should #animation set #activeSlideIndex as (this.dotsCount - 1) if #activeSlideIndexi === -1', () => {
        const position = 999;
        component.activeSlideIndex = -1;
        fixture.detectChanges();
        component.animate(position);

        expect(component.activeSlideIndex).toEqual(1);
    });

    it('should #animation set #curCarouselPosition & carouselRow transform style. if #activeSlideIndex === -1', (done) => {
        fixture.detectChanges();
        const position = 999;
        component.activeSlideIndex = -1;
        component.slideWidth = 1;
        component.animate(position);

        setTimeout(() => {
            expect(component.curCarouselPosition).toEqual(-2); // -(slidesToScroll(1) * slideWidth(1)) * dotsCount(2)
            expect(component.carouselRow.nativeElement.style.transform).toEqual(`translateX(-2px)`);
            done();
        }, 550);
    });

    it('should #move quit if #isScrolling is true', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.isScrolling = true;

        component.move('forward');

        expect(component.animate).not.toHaveBeenCalled();
    });

    it('should #move call #animate method if #isScrolling is false', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.isScrolling = false;

        component.move('forward');

        expect(component.animate).toHaveBeenCalled();
    });

    it('should #move method set #curCarouselPosition. with "forward" as argument', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.isScrolling = false;

        component.move('forward');

        expect(component.curCarouselPosition)
            .toEqual(component.carouselRowRects.right - component.scrollStep < component.carouselWrapperRects.right ?
            -(component.carouselRowRects.right - component.carouselWrapperRects.right) : -component.scrollStep);
    });

    it('should #move method set #curCarouselPosition. with "back" as argument. index = 0', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.isScrolling = false;
        component.activeSlideIndex = 0;
        const widthPenalty = component.slideWidth * (component.dotsCount * component.slidesToScroll - component.slidesArr.length);

        component.move('back');

        expect(component.curCarouselPosition)
            .toEqual(component.curCarouselPosition += component.carouselRowRects.left + component.scrollStep > component.carouselWrapperRects.left ?
            component.carouselWrapperRects.left - component.carouselRowRects.left : component.scrollStep - widthPenalty);
    });

    it('should #move method set #curCarouselPosition. with "back" as argument. index = 1', () => {
        fixture.detectChanges();
        spyOn(component, 'animate');
        component.isScrolling = false;
        component.activeSlideIndex = 1;
        const widthPenalty = 0;

        component.move('back');

        expect(component.curCarouselPosition)
            .toEqual(component.curCarouselPosition += component.carouselRowRects.left + component.scrollStep > component.carouselWrapperRects.left ?
            component.carouselWrapperRects.left - component.carouselRowRects.left : component.scrollStep - widthPenalty);
    });
});

@Component({
    template: `
        <sdk-carousel>
            <sdk-slide>Acca</sdk-slide>
            <sdk-slide>Dacca</sdk-slide>
        </sdk-carousel>`,
})
class TestComponent {
}
