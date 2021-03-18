import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GLYPHS } from './icon.glyphs';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = 'var(--color)';
const DEFAULT_ICON = 'ngx-slice';
const INKBE_ICON = 'inkbe';
const INKBE_COEFF = 70 / 32;

@Component({
    selector: 'sdk-icon',
    template: `
        <span [innerHTML]="svg"></span>
    `,
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnDestroy, AfterContentInit {

    private $color: BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_COLOR);
    private $size: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SIZE);
    svg: SafeHtml;
    private preparing: boolean;

    @Input() icon: string = DEFAULT_ICON;
    @Input() image: string;
    @Input() inline: boolean = true;

    @Input() set size(size: number) {
        this.$size.next(size);
        this.renderComponentSvg(); // is it even good?
    }

    @Input('color') set color(c: string) {
        this.$color.next(c);
        this.renderComponentSvg();
    }

    get size(): number {
        return this.$size.getValue();
    }

    get color(): string {
        return this.$color.getValue();
    }

    constructor(
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2
    ) {
    }

    prepareSymbol(name: string, color?: string): string {
        if (this.preparing) {
            return;
        }

        this.preparing = true;

        let symbol = GLYPHS[name] || DEFAULT_ICON;
        if (color?.length > 0) {
            symbol = symbol.replace(`fill="var(--regular-text)"`, `fill="${color}"`);
        }

        if (this.size > DEFAULT_SIZE || this.size < DEFAULT_SIZE) {
            symbol = symbol.replace(`height="24px"`, `height="${this.size}px"`);
            if (name === INKBE_ICON) {
                symbol = symbol.replace(`width="52.5px"`, `width="${this.size * INKBE_COEFF}px"`);
            } else {
                symbol = symbol.replace(`width="24px"`, `width="${this.size}px"`);
            }
        }

        this.preparing = false;
        return symbol;
    }

    createIcon(symbol: string): void {
        this.renderer.createElement('svg', symbol);
    }

    createSafeHtml(symbol: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(symbol);
    }

    renderComponentSvg(): void {
        this.svg = this.createSafeHtml(this.prepareSymbol(this.icon, this.color));
    }

    setIconColor(color: string): void {
        if (color && color.length > 0) {
            const symbol = this.elementRef.nativeElement.querySelector(`[class="icon"]`);
            this.renderer.setAttribute(symbol, 'fill', color);
        }
    }

    ngAfterContentInit(): void {
        const svg = this.elementRef.nativeElement.querySelector(`[fill="var(--regular-text)"]`);
        if (svg) {
            this.renderer.setAttribute(svg, 'height', `${this.size}px`);
            this.renderer.setAttribute(svg, 'width', `${this.size}px`);
            this.renderer.setAttribute(svg, `fill`, this.color);
        }
    }

    ngOnInit(): void {
        if (!this.icon) {
            this.icon = 'ngx-slice';
        }
        this.svg = this.createSafeHtml(this.prepareSymbol(this.icon, this.color));
    }

    ngOnDestroy(): void {
    }
}
