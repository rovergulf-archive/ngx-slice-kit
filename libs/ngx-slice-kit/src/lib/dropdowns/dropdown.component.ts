import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { OptionModel } from './dropdown-option.model';
import { DropdownOptions } from './dropdown.model';
import { fromEvent, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { OptionsService } from './options.service';

const DEFAULT_DROPDOWN_SIZE = 240;
// I'm taking additional 16 pixels here, to prevent element sticking to bottom panel
const DEFAULT_DROPDOWN_OFFSET = 256;

@Component({
    selector: 'sdk-dropdown-menu',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('dropdown', {static: false}) dropdownElement: ElementRef;
    @Output() result: EventEmitter<any> = new EventEmitter<any>();
    @Input() config: DropdownOptions;

    sub: Subscription;
    currentOption: OptionModel;
    inverted: boolean;
    rects: { bottom?, top?, left?, width? } = {};
    highlightedIndex: number;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private elem: ElementRef,
        private renderer: Renderer2,
        public optionsService: OptionsService
    ) {
    }

    onOptionMouseEnter(o: OptionModel, index: number): void {
        this.currentOption = o;
        this.highlightedIndex = index;
    }

    onOptionMouseLeave(): void {
        this.currentOption = undefined;
        this.highlightedIndex = undefined;
    }

    select(ev: any, option: OptionModel): void {
        this.onResult(option);
    }

    onResult(res?: OptionModel): void {
        this.result.emit(res);
        this.result.complete();
        this.sub?.unsubscribe();
    }

    nextOption(direction: 'up' | 'down'): void {
        if (!this.highlightedIndex && this.highlightedIndex !== 0) {
            const selected = this.optionsService.options.find(o => o.selected);
            if (!!selected) {
                this.highlightedIndex = this.optionsService.options.indexOf(selected);
            } else {
                this.highlightedIndex = direction === 'up' ? 0 : this.optionsService.options.length - 1;
            }
        }

        if (this.optionsService.options?.length === 1) {
            this.currentOption = this.optionsService.options[0];
            this.highlightedIndex = 0;
        } else {
            const isFirstOption = this.highlightedIndex === 0;
            const optionsLength = this.optionsService.options.length;
            const isLastOption = this.highlightedIndex === optionsLength - 1;
            const index = direction === 'down' ? (isLastOption ? 0 : (this.highlightedIndex + 1)) :
                (isFirstOption ? (optionsLength - 1) : this.highlightedIndex - 1);

            this.currentOption = this.optionsService.options[index];
            this.highlightedIndex = index;
        }

        setTimeout(() => this.autoScroll(direction));
    }

    autoScroll(direction: 'up' | 'down'): void {
        const dropdownPaddingTop = 8;
        /**
         * okay that padding is constant at the top and the bottom of the element,
         * so it should be used in calculations when we are counting top offset
         */
        const {scrollHeight, scrollTop, offsetHeight} = this.dropdownElement.nativeElement;
        const currentItem = this.elem.nativeElement.querySelector(`.highlighted`);
        if (!currentItem) {
            return;
        }
        const itemHeight = currentItem.offsetHeight;

        switch (direction) {
            case 'up':
                if (currentItem.offsetTop - dropdownPaddingTop < scrollTop) {
                    this.dropdownElement.nativeElement.scrollTop = scrollTop - offsetHeight;
                }
                if (currentItem.offsetTop + itemHeight > scrollTop + offsetHeight) {
                    this.dropdownElement.nativeElement.scrollTop = scrollHeight - offsetHeight;
                }
                break;
            default:
                if (currentItem.offsetTop + itemHeight > offsetHeight + scrollTop) {
                    this.dropdownElement.nativeElement.scrollTop = scrollTop + itemHeight;
                } else if (currentItem.offsetTop === dropdownPaddingTop) {
                    this.dropdownElement.nativeElement.scrollTop = 0;
                }
        }
    }

    /**
     * click outside subscription if backdrop disabled. also dropdown must be attached during input
     */
    initClickOutsideSub(): void {
        this.renderer.listen('window', 'click', event => {
            const isParent = this.config.parentElem?.contains(event.target);
            const isDropdown = this.elem.nativeElement.contains(event.target);
            if (!isParent && !isDropdown) {
                this.onResult();
            }
        });
    }

    /**
     * detect relative position to prevent dropdown being hidden over `overflow: none`
     */
    getDropdownRects(): void {
        const windowHeight = window.innerHeight;
        const pixelsLeft = windowHeight - this.config.triggerRect.height - this.config.triggerRect.top;
        const rects = this.dropdownElement.nativeElement.getBoundingClientRect();

        this.inverted = pixelsLeft <= DEFAULT_DROPDOWN_OFFSET;
        if (this.inverted) {
            this.rects.bottom = windowHeight - this.config.triggerRect.top;
        } else {
            this.rects.top = this.config.triggerRect.bottom;
        }

        if (this.config.fitWidth) {
            this.rects.width = this.config.triggerRect.width;
        }

        if (rects.width > this.config.triggerRect.width) {
            const rightOffset = window.innerWidth - this.config.triggerRect.width - this.config.triggerRect.left;
            if (rightOffset <= rects.width + 16) {
                this.rects.left = (this.config.triggerRect.left + this.config.triggerRect.width) - rects.width;
            }
        }
    }

    /**
     * - if `fitWidth` config options is true
     * there are width declared depending on its parent element
     * - if `rects.top` calculated there is enough place to drop it down,
     *  if it hits `rects.bottom` – show it above the element
     */
    setDropdownPosition(): void {
        if (this.rects.width) {
            this.renderer.setStyle(this.dropdownElement.nativeElement, `width`, `${this.rects.width}px`);
        }

        if (this.rects.top) {
            this.renderer.setStyle(this.dropdownElement.nativeElement, `top`, `${this.rects.top}px`);
        } else {
            this.renderer.setStyle(this.dropdownElement.nativeElement, `bottom`, `${this.rects.bottom}px`);
        }

        this.renderer.setStyle(this.dropdownElement.nativeElement, `left`, `${this.rects.left || this.config.triggerRect.left}px`);
        this.renderer.setStyle(this.dropdownElement.nativeElement, `opacity`, 1);
    }

    /**
     * detect window resize and scroll to prevent failed dropdown position
     */
    initClosingSubscriptions(): void {
        this.sub = fromEvent(window, 'scroll').pipe(
            take(1)
        ).subscribe(() => {
            this.onResult();
        });

        this.sub.add(fromEvent(window, 'resize').pipe(
            take(1)
        ).subscribe(() => {
            this.onResult();
        }));
    }

    /**
     * keyboard events
     */
    initKeydownSubscription(): void {
        this.sub.add(
            fromEvent(this.document, 'keydown').subscribe((e: KeyboardEvent) => {
                switch (e.key || e.code) {
                    case 'ArrowDown':
                        e.preventDefault();
                        e.stopPropagation();
                        this.nextOption('down');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        e.stopPropagation();
                        this.nextOption('up');
                        break;
                    case 'Enter':
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.currentOption) {
                            this.onResult(this.currentOption);
                        }
                        break;
                    case 'Escape':
                        e.preventDefault();
                        e.stopPropagation();
                        this.onResult();
                        break;
                }
            })
        );
    }

    ngOnInit(): void {
        this.initClosingSubscriptions();
        this.initKeydownSubscription();
        if (this.config && this.config.hideBackdrop) {
            this.initClickOutsideSub();
        }
    }

    ngAfterViewInit(): void {
        this.getDropdownRects();
        this.setDropdownPosition();
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.currentOption = undefined;
        this.highlightedIndex = undefined;
    }

}
