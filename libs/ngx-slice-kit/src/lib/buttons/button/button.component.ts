import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

const AVAILABLE_SIZE_CLASS_NAMES = [
    'wide',
    'full-width'
];

const BUTTON_CLASS_NAMES = [
    'sdk-button',
    'sdk-flat-button',
    'sdk-raised-button',
    'sdk-stroked-button',
    'sdk-round-button',
];

@Component({
    selector: '[sdk-button], [sdk-flat-button], [sdk-raised-button], [sdk-stroked-button], [sdk-round-button]',
    // templateUrl: './button.component.html',
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit, OnDestroy {

    @Input() color: string = 'primary';
    @Input() size: 'wide' | 'full-width';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() small: boolean;
    @Input() style: any;
    @Input() autofocus: boolean;
    @Input() className: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        const elem = this.elementRef.nativeElement;

        /**
         * set base 'sdk-button' class
         */
        this.renderer.addClass(elem, 'sdk-button');

        /**
         * check if specified any button class types
         */
        for (const attr of BUTTON_CLASS_NAMES) {
            if (elem.hasAttribute(attr)) {
                this.renderer.addClass(elem, attr);
            }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeyup(ev: KeyboardEvent): void {
        if (ev.code === 'Space' || ev.key === 'Space' || ev.code === 'Enter' || ev.key === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    hasHostAttribute(attr: string): boolean {
        return this.elementRef.nativeElement.hasAttribute(attr);
    }

    ngOnInit(): void {
        /**
         * set button size if specified
         */
        if (AVAILABLE_SIZE_CLASS_NAMES.includes(this.size)) {
            this.renderer.addClass(this.elementRef.nativeElement, `sdk-button--${this.size}`);
        }

        /**
         * set button color if specified
         */
        this.renderer.addClass(this.elementRef.nativeElement, `sdk-button--${this.color}`);

        /**
         * set button small size if specified
         */
        if (this.small) {
            this.renderer.addClass(this.elementRef.nativeElement, `sdk-button--small`);
        }
    }

    ngOnDestroy(): void {
    }
}
