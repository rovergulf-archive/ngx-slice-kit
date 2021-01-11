import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild
} from '@angular/core';
import { SlideComponent } from './slide/slide.component';

@Component({
    selector: 'sdk-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

    @ContentChildren(SlideComponent) carouselSlides: QueryList<SlideComponent>;
    @ViewChild('carouselRow', {static: true}) carouselRow: ElementRef;
    @ViewChild('carouselWrapper', {static: true}) carouselWrapper: ElementRef;

    @Input() dots: boolean = false;
    @Input() infinity: boolean = false;
    @Input() pauseByHover: boolean = false;
    @Input() arrows: boolean = true;
    @Input() slidesToScroll: number = 1;
    @Input() slidesToShow: number = 1;
    @Input() timeout: number = 5000;
    @Input() offset: number = 0;

    slidesArr: SlideComponent[] = [];
    activeSlideIndex: number = 0;
    curCarouselPosition: number = 0;
    slideWidth: number;
    scrollStep: number;
    carouselWrapperRects: ClientRect;
    carouselRowRects: ClientRect;
    scrolling: boolean;

    scrollinterval: any;

    carouselRowGrabbed: boolean = false;
    scrollStartX: number;
    scrollOffset: number;

    pagePenalty: number = 0;
    isViewInited: boolean = false;

    firstPageClones: SlideComponent[];
    lastPageClones: SlideComponent[];

    get dotsCount() {
        return Math.ceil(this.slidesArr.length / this.slidesToScroll);
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    @HostListener('pointerup') pointerUpHandler(): void {
        if (!this.carouselRowGrabbed) {
            return;
        }

        this.carouselRowGrabbed = false;

        if (this.scrollOffset < this.curCarouselPosition - 100) {
            this.move('forward');
        } else if (this.scrollOffset > this.curCarouselPosition + 100) {
            this.move('back');
        } else {
            this.animate(this.curCarouselPosition);
        }
        this.scrollOffset = 0;
    }

    @HostListener('window:resize') windowResizeHandler() {
        if (this.carouselWrapper.nativeElement.offsetWidth !== this.carouselWrapperRects.width) {
            this.updateSlider();
        }
    }

    @HostListener('pointermove', ['$event']) pointerMoveHandler(event: PointerEvent): void {
        if (this.carouselRowGrabbed) {
            this.scrollOffset = this.curCarouselPosition + event.clientX - this.scrollStartX;
            this.renderer.setStyle(this.carouselRow.nativeElement, 'transform', `translateX(${this.scrollOffset}px)`);
        }
    }

    @HostListener('pointerleave') pointerLeaveHandler(): void {
        if (this.pauseByHover && this.timeout) {
            this.startInterval();
        }

        if (this.carouselRowGrabbed) {
            this.pointerUpHandler();
        }
    }

    animate(newPosition) {
        this.scrolling = true;
        this.renderer.setStyle(this.carouselRow.nativeElement, 'transition', `400ms`);
        this.renderer.setStyle(this.carouselRow.nativeElement, 'transform', `translateX(${newPosition}px)`);
        this.updatePosition();

        if (this.activeSlideIndex + 1 > this.dotsCount) {
            this.activeSlideIndex = 0;
            setTimeout(() => {
                this.curCarouselPosition = -(this.slidesToScroll * this.slideWidth);
                this.renderer.setStyle(this.carouselRow.nativeElement, 'transform', `translateX(${this.curCarouselPosition}px)`);
                this.carouselRowRects = this.carouselRow.nativeElement.getBoundingClientRect();
            }, 500);
        }

        if (this.activeSlideIndex === -1) {
            this.activeSlideIndex = this.dotsCount - 1;
            setTimeout(() => {
                this.curCarouselPosition = -(this.slidesToScroll * this.slideWidth) * this.dotsCount;
                this.renderer.setStyle(this.carouselRow.nativeElement, 'transform', `translateX(${this.curCarouselPosition}px)`);
                this.carouselRowRects = this.carouselRow.nativeElement.getBoundingClientRect();
            }, 500);
        }
    }

    grab(event: PointerEvent): void {
        event.preventDefault();

        this.carouselRowGrabbed = true;
        this.scrollStartX = event.clientX;
    }

    startInterval(): void {
        this.scrollinterval = setInterval(() => {
            this.move('forward');
        }, this.timeout);
    }

    pause(): void {
        clearInterval(this.scrollinterval);
    }

    move(direction: 'forward' | 'back') {
        this.carouselWrapperRects = this.carouselWrapper.nativeElement.getBoundingClientRect();
        const widthPenalty = (this.activeSlideIndex === 0 ? this.slideWidth * (this.dotsCount * this.slidesToScroll - this.slidesArr.length) : 0);

        if (this.scrolling) {
            return;
        }
        switch (direction) {
            case 'back':
                this.curCarouselPosition += this.carouselRowRects.left + this.scrollStep > this.carouselWrapperRects.left ?
                    this.carouselWrapperRects.left - this.carouselRowRects.left : this.scrollStep - widthPenalty;
                break;
            case 'forward':
                this.curCarouselPosition += this.carouselRowRects.right - this.scrollStep < this.carouselWrapperRects.right ?
                    -(this.carouselRowRects.right - this.carouselWrapperRects.right) : -this.scrollStep;
                break;
        }

        const prevIndex = this.activeSlideIndex;
        this.activeSlideIndex = Math.ceil(Math.abs(this.curCarouselPosition + this.pagePenalty) / (this.scrollStep)) % (this.dotsCount + 1);

        if (prevIndex === 0 && this.activeSlideIndex === 1 && direction === 'back') {
            this.activeSlideIndex = -1;
        }

        this.animate(this.curCarouselPosition);
    }

    selectSlide(slideIndex: number) {
        this.activeSlideIndex = slideIndex;

        let notMultipleDif = 0;
        if (slideIndex + 1 === this.dotsCount) {
            notMultipleDif = (this.slidesArr.length % this.slidesToScroll) * this.slideWidth;
        }

        this.curCarouselPosition = -(this.activeSlideIndex * this.slideWidth * this.slidesToScroll - notMultipleDif) - this.pagePenalty;
        this.animate(this.curCarouselPosition);
    }

    updatePosition(): void {
        setTimeout(() => {
            this.carouselRowRects = this.carouselRow.nativeElement.getBoundingClientRect();
            this.renderer.removeStyle(this.carouselRow.nativeElement, 'transition');
            this.scrolling = false;
        }, 500);
    }

    setSlideStyles() {
        this.slidesArr.forEach(slide => {
            if (this.offset) {
                this.renderer.setStyle(slide.el.nativeElement, 'padding', this.offset + 'px');
            }
            this.renderer.setStyle(slide.el.nativeElement, 'width', this.slideWidth + 'px');
        });
    }

    checkSlidesToScroll() {
        if (this.slidesToScroll > this.slidesArr.length) {
            this.slidesToScroll = this.slidesArr.length;
        }
    }

    createClones() {
        this.lastPageClones = [...this.slidesArr].slice(-this.slidesToShow).map(this.cloneNode.bind(this)).reverse() as SlideComponent[];
        this.firstPageClones = [...this.slidesArr].slice(0, this.slidesToShow).map(this.cloneNode.bind(this));
    }

    cloneNode(node) {
        const clone = node.el.nativeElement.cloneNode(true);
        this.renderer.addClass(clone, 'sdk-slide--clone');
        return clone;
    }

    insertClones() {
        for (const clone of this.lastPageClones) {
            this.renderer.insertBefore(this.carouselRow.nativeElement, clone, this.carouselRow.nativeElement.firstChild);
        }
        for (const clone of this.firstPageClones) {
            this.renderer.appendChild(this.carouselRow.nativeElement, clone);
        }
    }

    removeClones() {
        for (const clone of this.firstPageClones) {
            this.renderer.removeChild(this.carouselRow.nativeElement, clone);
        }
        for (const clone of this.lastPageClones) {
            this.renderer.removeChild(this.carouselRow.nativeElement, clone);
        }
    }

    updateSlider() {
        this.carouselWrapperRects = this.carouselWrapper.nativeElement.getBoundingClientRect();
        this.slideWidth = this.carouselWrapper.nativeElement.offsetWidth / this.slidesToShow;
        this.scrollStep = this.slidesToScroll * this.slideWidth;

        this.setSlideStyles();
        this.checkSlidesToScroll();

        if (this.infinity) {
            this.pagePenalty = this.scrollStep;
            if (this.firstPageClones || this.lastPageClones) {
                this.removeClones();
            }
            this.createClones();
            this.insertClones();

            this.curCarouselPosition = -(this.slidesToScroll * this.slideWidth);
            this.renderer.setStyle(this.carouselRow.nativeElement, 'transform', `translateX(${this.curCarouselPosition}px)`);
            this.updatePosition();
        }
        this.carouselRowRects = this.carouselRow.nativeElement.getBoundingClientRect();
    }

    ngOnInit(): void {
        this.carouselRow.nativeElement.addEventListener('pointerdown', this.grab.bind(this));
        if (this.pauseByHover && this.timeout) {
            this.el.nativeElement.addEventListener('pointerenter', this.pause.bind(this));
        }
    }

    ngAfterContentInit(): void {
        this.slideWidth = this.carouselWrapper.nativeElement.offsetWidth / this.slidesToShow;
        this.slidesArr = this.carouselSlides.toArray();
    }

    ngAfterViewInit(): void {
        this.isViewInited = true;
        setTimeout(() => {
            this.updateSlider();
            if (this.timeout) {
                this.startInterval();
            }
        })
    }

    ngOnChanges(changes) {
        if (this.isViewInited) {
            if (changes.slidesToScroll || changes.slidesToShow) {
                this.updateSlider();
            }
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.scrollinterval);
    }
}
