import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = 'var(--regular-text)';
const DEFAULT_ICON = 'ngx-slice';
const INKBE_ICON = 'inkbe';
const INKBE_COEFF = 70 / 32;

@Component({
    selector: 'sdk-icon',
    templateUrl: './icon.component.html',
    // template: `
    //     <span [innerHTML]="svg"></span>
    // `,
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnDestroy {

    svg: SafeHtml;
    @Input() icon: string = `ngx-slice`;
    @Input() inline: boolean = true;
    @Input() size: number = 24;

    constructor(
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        private render2: Renderer2
    ) {
    }

    @Input('color') set color(color: string) {
        this.setIconColor(color);
    }

    /**
     * So this solution came to me during google css-hacks
     * and got this one: https://css-tricks.com/svg-symbol-good-choice-icons/
     * so i used new one scheme and it seems pretty simple nice, and easy scalable
     */
    renderIcon(name: string): void {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(`<use xlink:href="#${name}"/>`);
    }

    setIconColor(color: string): void {
        if (color && color.length > 0) {
            const symbol = this.elementRef.nativeElement.querySelector(`[class=${this.icon}]`);
            if (symbol) {
                this.render2.setAttribute(symbol, 'fill', color);
            }
        }
    }

    ngOnInit(): void {
        this.renderIcon(this.icon);
    }

    ngOnDestroy(): void {
    }

}

