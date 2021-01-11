import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DARK_THEME } from './symbols';

import { Theme } from './theme.interface';
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
        this.$currentTheme.next(t);
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
        return this.themes.indexOf(this.currentTheme);
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
    getProperty(propName: string) {
        const theme = this.currentTheme;
        if (theme.hasOwnProperty(propName)) {
            return this.currentTheme.properties[propName];
        } else {
            return '';
        }
    }

    registerTheme(theme: Theme) {
        this.themes.push(theme);
    }

    updateTheme(name: string, properties: { [key: string]: string; }) {
        const theme = this.findTheme(name);
        theme.properties = {
            ...theme.properties,
            ...properties
        };
        if (this.currentTheme.name === name) {
            this.currentTheme = theme;
        }
    }

    rgbaToRgb(rgba: string, background: string = '#fff') {
    }

}
