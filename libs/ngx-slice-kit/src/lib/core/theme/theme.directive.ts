import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { Theme } from './theme.model';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';

@Directive({
    selector: '[sdk-theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

    /**
     * Whether the styles are scoped or not.
     */
    @Input() scoped = false;
    /**
     * specify selected theme or use default.
     */
    @Input('sdk-theme') theme: string;

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
    updateTheme(theme: Theme): void {
        const element = this.getElement();

        element.className = `sdk-theme-${theme.name}`; // probably unsafe
        if (!this.layoutControl.platform.BLINK) {
            element.classList.add('sdk-custom-scroll');
        } else {
            element.classList.add(this.layoutControl.getPlatformClass());
        }

        const oldStyles = this.document.head.querySelectorAll('[sdk-theme]');
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
            }
        }
        styles.innerHTML += `}`;
        this.renderer.setAttribute(styles, 'sdk-theme', theme.name);

        this.document.head.appendChild(styles);
    }

    /**
     * Element to attach the styles to.
     */
    getElement(): any {
        return this.scoped ? this.elementRef.nativeElement : this.document.body;
    }

    ngOnInit(): void {
        this.sub = this.themeService.currentThemeObservable
            .subscribe((theme: Theme) => this.updateTheme(theme));

        if (this.theme && this.theme?.length > 0) {
            this.themeService.setTheme(this.theme);
        } else {
            this.updateTheme(this.themeService.currentTheme);
        }
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
