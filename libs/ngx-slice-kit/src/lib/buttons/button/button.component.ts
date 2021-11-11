import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

const AVAILABLE_SIZE_CLASS_NAMES = [
    'wide',
    'full-width'
];

const BUTTON_CLASS_NAMES = [
    'sdk-base-button',
    'sdk-flat-button',
    'sdk-raised-button',
    'sdk-stroked-button',
    'sdk-round-button',
    'sdk-icon-button',
];

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[sdk-base-button], [sdk-flat-button], [sdk-raised-button], [sdk-stroked-button], [sdk-round-button], [sdk-icon-button]',
    // templateUrl: './button.component.html',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

    @Input() public color: string = 'primary';
    @Input() public size: 'wide' | 'full-width';
    @Input() public small: boolean;
    @Input() @HostBinding('class.disabled')
    public disabled: boolean;
    // @Input() public style: any;
    // @Input() public className: string;

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
    public onKeyup(ev: KeyboardEvent): void {
        if (ev.code === 'Space' || ev.key === 'Space' || ev.code === 'Enter' || ev.key === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    public hasHostAttribute(attr: string): boolean {
        return this.elementRef.nativeElement.hasAttribute(attr);
    }

    public ngOnInit(): void {
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
}
