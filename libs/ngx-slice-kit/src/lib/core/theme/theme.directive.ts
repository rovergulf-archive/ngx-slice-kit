import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { Theme } from './theme.model';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';

@Directive({
    selector: '[sdkTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

    /**
     * Whether the styles are scoped or not.
     */
    @Input() public scoped = false;
    /**
     * specify selected theme or use default.
     */
    @Input('sdkTheme') public theme: string;

    private sub: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private themeService: ThemeService,
        private layoutControl: LayoutControlService
    ) {
    }

    /**
     * Update the theme on the scoped element.
     */
    public updateTheme(theme: Theme): void {
        const element = this.getElement();

        element.className = `sdk-theme-${theme.name}`; // probably unsafe
        if (!this.layoutControl.platform.BLINK) {
            element.classList.add('sdk-custom-scroll');
        } else {
            element.classList.add(this.layoutControl.getPlatformClass());
        }

        const oldStyles = this.document.head.querySelectorAll('[sdkTheme]');
        if (oldStyles?.length > 0) {
            this.document.head.removeChild(oldStyles[0]);
        }
        const styles = this.renderer.createElement('style');

        // project properties onto the element
        styles.innerHTML += `body {`;
        for (const prop of theme.props()) {
            if (!!prop.rgb) {
                styles.innerHTML += (`${prop.prop}-raw: ${prop.value};`);
                styles.innerHTML += (`${prop.prop}-rgb: ${prop.rgb};`);
                styles.innerHTML += (`${prop.prop}-opposite: ${prop.background};`);
                styles.innerHTML += (`${prop.prop}: ${prop.hex};`);
                if (prop.text_value) {
                    styles.innerHTML += (`${prop.prop}-text-raw: ${prop.text_value};`);
                    styles.innerHTML += (`${prop.prop}-text: ${prop.text};`);
                }
            }
        }
        styles.innerHTML += `}`;
        this.renderer.setAttribute(styles, 'sdkTheme', theme.name);

        this.document.head.appendChild(styles);
    }

    /**
     * Element to attach the styles to.
     */
    public getElement(): any {
        return this.scoped ? this.elementRef.nativeElement : this.document.body;
    }

    public ngOnInit(): void {
        this.sub = this.themeService.currentThemeObservable
            .subscribe((theme: Theme) => this.updateTheme(theme));

        if (this.theme && this.theme?.length > 0) {
            this.themeService.setTheme(this.theme);
        } else {
            this.updateTheme(this.themeService.currentTheme);
        }
    }

    public ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
