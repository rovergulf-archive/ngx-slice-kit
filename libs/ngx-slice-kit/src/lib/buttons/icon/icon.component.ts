import { AfterContentInit, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GLYPHS } from './icon.glyphs';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = 'var(--base)';
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
export class IconComponent implements OnInit, AfterContentInit {

    private $color: BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_COLOR);
    private $size: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SIZE);
    private preparing: boolean;
    public svg: SafeHtml;

    @Input() public icon: string = DEFAULT_ICON;
    @Input() public image: string;
    @Input() public inline: boolean = true;

    @Input() public set size(size: number) {
        this.$size.next(size);
        this.renderComponentSvg(); // is it even good?
    }

    public get size(): number {
        return this.$size.getValue();
    }

    @Input() public set color(c: string) {
        this.$color.next(c);
        this.renderComponentSvg();
    }

    public get color(): string {
        return this.$color.getValue();
    }

    constructor(
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2
    ) {
    }

    public prepareSymbol(name: string, color?: string): string {
        if (this.preparing) {
            return;
        }

        this.preparing = true;

        let symbol = GLYPHS[name] || DEFAULT_ICON;
        if (color?.length > 0) {
            symbol = symbol.replace(`fill="var(--base)"`, `fill="${color}"`);
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

    public createIcon(symbol: string): void {
        this.renderer.createElement('svg', symbol);
    }

    public createSafeHtml(symbol: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(symbol);
    }

    public renderComponentSvg(): void {
        this.svg = this.createSafeHtml(this.prepareSymbol(this.icon, this.color));
    }

    public setIconColor(color: string): void {
        if (color && color.length > 0) {
            const symbol = this.elementRef.nativeElement.querySelector(`[class="icon"]`);
            this.renderer.setAttribute(symbol, 'fill', color);
        }
    }

    public ngAfterContentInit(): void {
        const svg = this.elementRef.nativeElement.querySelector(`[fill="var(--base)"]`);
        if (svg) {
            this.renderer.setAttribute(svg, 'height', `${this.size}px`);
            this.renderer.setAttribute(svg, 'width', `${this.size}px`);
            this.renderer.setAttribute(svg, `fill`, this.color);
        }
    }

    public ngOnInit(): void {
        if (!this.icon) {
            this.icon = 'ngx-slice';
        }
        this.svg = this.createSafeHtml(this.prepareSymbol(this.icon, this.color));
    }
}
