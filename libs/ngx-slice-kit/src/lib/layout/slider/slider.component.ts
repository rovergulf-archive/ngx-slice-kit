import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'sdk-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {

    @ViewChild('thumb', {static: true}) public thumb: ElementRef;
    @ViewChild('addThumb', {static: false}) public addThumb: ElementRef;
    @ViewChild('thumbMultiple', {static: false}) public thumbMultiple: ElementRef;
    @ViewChild('track', {static: true}) public track: ElementRef;

    @Input() public max: number = 100;
    @Input() public min: number = 0;
    @Input() public step: number = 1;
    @Input() public color: string = 'var(--primary)';
    @Input() public value: any;
    @Input() public disabled: boolean = false;
    @Input() public multiple: boolean = false;
    @Input() public small: boolean = false;

    public isDrag: boolean = false;
    public isMultipleDrag: boolean = false;
    public trackRects: ClientRect;
    public thumbCoords: number;
    public multiThumbCoords: number;

    public interValue: number = 0;
    public gradientSize: number;
    public gradientLeftOffset: number;
    public subscription: Subscription = new Subscription();

    public thumbSize: number;
    public thumbClickOffset: number;
    public multiThumbClickOffset: number;

    @Output() public changed = new EventEmitter();
    @Output() public moved = new EventEmitter();

    constructor(
        private renderer: Renderer2,
    ) {
    }

    public grab(prop, event): void {
        this[prop] = true;
        if (prop === 'isDrag') {
            this.thumbClickOffset = event.layerX;
        }
        if (prop === 'isMultipleDrag') {
            this.multiThumbClickOffset = event.layerX;
        }
    }

    @HostListener('document:pointerup')
    public drop(): void {
        this.isDrag = false;
        this.isMultipleDrag = false;
    }

    @HostListener('document:pointermove', ['$event'])
    public pointerMove(e: PointerEvent): void {
        if (this.isDrag) {
            this.thumbCoords = this.getCoords(e.clientX - this.thumbClickOffset);
            if (this.thumbCoords < this.multiThumbCoords + (this.thumbSize / this.trackRects.width * 100)) {
                return;
            }

            this.renderer.setStyle(this.thumb.nativeElement, 'left', this.thumbCoords + '%');

            this.setGradient(this.thumbCoords);
            this.calcValue(this.thumbCoords, this.multiple ? 'max' : null);
            this.moved.emit();
        }

        if (this.isMultipleDrag) {
            this.multiThumbCoords = this.getCoords(e.clientX - this.multiThumbClickOffset);

            if (this.multiThumbCoords + (this.thumbSize / this.trackRects.width * 100) > this.thumbCoords) {
                return;
            }

            this.renderer.setStyle(this.thumbMultiple.nativeElement, 'left', this.multiThumbCoords + '%');

            this.setGradient(this.multiThumbCoords, true);
            this.calcValue(this.multiThumbCoords, 'min');
            this.moved.emit();
        }
    }

    public getCoords(mouseX: number): number {
        this.trackRects = this.track.nativeElement.getBoundingClientRect();
        if (mouseX < this.trackRects.left) {
            mouseX = this.trackRects.left;
            this.setValue(this.min);
        }

        if (mouseX > this.trackRects.right) {
            mouseX = this.trackRects.right;
            this.setValue(this.max);
        }

        return (mouseX - this.trackRects.left) / this.trackRects.width * 100;
    }

    public moveThumb(e: MouseEvent): void {
        const target: HTMLElement = e.target as HTMLElement;

        if (target.classList.contains('sdk-slider__thumb')) {
            return;
        }

        const coords = this.getCoords(e.clientX);
        if (this.multiple) {
            const firstThumb = {
                thumb: this.thumbMultiple,
                coords: this.multiThumbCoords,
                position: 'left'
            };
            const secThumb = {
                thumb: this.thumb,
                coords: this.thumbCoords,
                position: 'right'
            };

            if (secThumb.coords <= firstThumb.coords) {
                [secThumb.coords, firstThumb.coords] = [firstThumb.coords, secThumb.coords];
            }

            const targetThumb = this.selectTargetBlock(coords, firstThumb, secThumb);
            this.renderer.setStyle(targetThumb.thumb.nativeElement, 'left', coords + '%');
            targetThumb.position === 'left' ? this.multiThumbCoords = coords : this.thumbCoords = coords;
            this.setGradient(coords, targetThumb.position === 'left');
            this.calcValue(coords, targetThumb.position === 'left' ? 'min' : 'max');
        } else {
            this.isDrag = true;
            this.renderer.setStyle(this.thumb.nativeElement, 'left', coords + '%');
            this.setGradient(coords);
            this.calcValue(coords);
        }

        this.moved.emit();
    }

    public setGradient(thumbCoords: number, fromLeft?: boolean): void {
        if (fromLeft) {
            this.gradientLeftOffset = thumbCoords;
        } else {
            this.gradientSize = thumbCoords;
        }
    }

    public selectTargetBlock(
        clickCoords: number,
        firstThumb: { thumb: ElementRef, coords: number, position: string },
        secThumb: { thumb: ElementRef, coords: number, position: string }
    ): { thumb: ElementRef, coords: number, position: string } {
        return Math.abs(clickCoords - firstThumb.coords) < Math.abs(clickCoords - secThumb.coords) ? firstThumb : secThumb;
    }

    public calcValue(thumbCoords: number, rangeSide?: 'min' | 'max'): void {
        const diff = this.max - this.min;

        this.interValue = Math.round(diff / 100 * thumbCoords);
        const newValue = this.step * Math.ceil(this.interValue / this.step) + this.min;

        this.setValue(newValue, rangeSide);
    }

    public setValue(newValue: number, rangeSide?: 'max' | 'min'): void {
        if (this.multiple) {
            if (rangeSide === 'max') {
                if (this.value.max !== newValue) {
                    this.value.max = newValue;
                    this.changed.emit(this.value);
                }
            }
            if (rangeSide === 'min') {
                if (this.value.min !== newValue) {
                    this.value.min = newValue;
                    this.changed.emit(this.value);
                }
            }
        } else {
            if (this.value !== newValue) {
                this.value = newValue;
                this.changed.emit(this.value);
            }
        }
    }

    public setInitialThumbCoords(): void {
        this.trackRects = this.track.nativeElement.getBoundingClientRect();
        // const padding = this.thumbSize;
        const diff = this.max - this.min;
        const valuePercent = this.multiple ? (this.value.max - this.min) * 100 / diff : (this.value - this.min) * 100 / diff;

        if (this.multiple) {
            setTimeout(() => {
                const multipleValuePercent = (this.value.min - this.min) * 100 / diff;

                this.multiThumbCoords = multipleValuePercent;
                this.setGradient(multipleValuePercent, true);
                this.renderer.setStyle(this.thumbMultiple.nativeElement, 'left', multipleValuePercent + '%');
            });
        }

        this.thumbCoords = valuePercent;
        this.setGradient(valuePercent);
        this.renderer.setStyle(this.thumb.nativeElement, 'left', valuePercent + '%');
    }

    public ngOnInit(): void {
        this.trackRects = this.track.nativeElement.getBoundingClientRect();
        this.thumbSize = this.multiple ? 12 : this.small ? 24 : 32;

        if (this.min > this.max) {
            [this.max, this.min] = [this.min, this.max];
        }

        if (!this.multiple) {
            if (this.value < this.min) {
                this.value = this.min;
            }
            if (this.value > this.max) {
                this.value = this.max;
            }
        } else {
            if (this.value && this.value.min < this.min) {
                this.value.min = this.min;
            }
            if (this.value && this.value.max > this.max) {
                this.value.max = this.max;
            }
        }

        this.value = this.value || (this.multiple ? {max: this.max, min: this.min} : this.min);

        if (this.value && this.value !== this.min) {
            this.setInitialThumbCoords();
        }
    }

    public ngAfterViewInit(): void {
        this.thumbCoords = this.getCoords(this.thumb.nativeElement.getBoundingClientRect().left + this.thumbSize);
        if (this.multiple) {
            this.multiThumbCoords = this.getCoords(this.thumbMultiple.nativeElement.getBoundingClientRect().left);
        }
    }
}
