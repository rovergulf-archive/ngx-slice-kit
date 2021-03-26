import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DARK_THEME } from './symbols';

import { Theme } from './theme.model';
import { themeLight } from './lib/theme-light';
import { themeDark } from './lib/theme-dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    themes: Theme[] = [themeLight, themeDark];
    private $currentTheme = new BehaviorSubject<Theme>(this.getDefaultTheme());

    constructor(
        // @Optional() public injectedThemes: Theme[], // TODO theme injection feature v2++
        // @Optional() public active: string // TODO better control
    ) {
    }

    get currentTheme(): Theme {
        return this.$currentTheme.getValue();
    }

    set currentTheme(t: Theme) {
        this.$currentTheme.next(new Theme(t));
    }

    get themeName(): string {
        return this.$currentTheme.getValue().name;
    }

    get currentThemeObservable(): Observable<Theme> {
        return this.$currentTheme.asObservable();
    }

    get darkness(): boolean {
        return this.themeName === DARK_THEME;
    }

    /**
     * check if there is saved theme, then looks it up at theme repository
     */
    getDefaultTheme(): Theme {
        return this.findTheme(themeLight.name);
    }

    /**
     * Find theme by specified theme
     * Always returns 'light' theme if no results
     */
    findTheme(name: string): Theme {
        return this.themes.find(t => t.name === name) || themeLight;
    }

    /**
     * returns current theme index
     */
    getCurrentThemeIndex(): number {
        return this.themes.findIndex(t => t.name === this.currentTheme.name);
    }

    /**
     * Switch to next theme, find current index
     * and if (current + 1) is out of index expression just go to themes[0]
     */
    nextTheme(): void {
        const currentIndex = this.getCurrentThemeIndex();
        const isLast = currentIndex === (this.themes.length - 1);
        this.currentTheme = isLast ? this.themes[0] : this.themes[currentIndex + 1];
    }

    /**
     * Sets specified specified theme by name
     *
     * @param name is required
     */
    setTheme(name: string): void {
        const t = this.findTheme(name);
        if (!t) {
            console.warn('Specified theme name not found: ', name);
        }
        this.currentTheme = t;
    }

    /**
     * Gets value of specified theme property
     *
     * @param propName is required
     */
    getProperty(propName: string): string {
        const theme = this.currentTheme;
        if (theme.hasOwnProperty(propName)) {
            return this.currentTheme[propName];
        } else {
            return '';
        }
    }

    /**
     * Registers new theme in service memory
     * @param theme contains new Theme references
     * cannot be named as `light`, `dark` or any default themes
     */
    registerTheme(theme: Theme): void {
        if (!!this.themes.find(t => t.name === theme.name)) {
            theme.name = `custom_${theme.name}_${this.themes.length + 1}`;
        }
        this.themes.push(new Theme(theme));
    }

    updateTheme(t: Theme): void {
        const theme = this.findTheme(t.name);
        if (!!theme) {
            this.currentTheme = new Theme(t);
        }
    }

}
