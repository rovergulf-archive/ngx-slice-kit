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
    private $themes: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([new Theme(themeLight), new Theme(themeDark)]);
    private $currentTheme = new BehaviorSubject<Theme>(this.getDefaultTheme());

    constructor(
        // @Optional() public injectedThemes: Theme[], // TODO theme injection feature v2++
        // @Optional() public active: string // TODO better control
    ) {
    }

    public get themes(): Theme[] {
        return this.$themes.getValue();
    }

    public get themesObservable(): Observable<Theme[]> {
        return this.$themes.asObservable();
    }

    public get currentTheme(): Theme {
        return this.$currentTheme.getValue();
    }

    public set currentTheme(t: Theme) {
        this.$currentTheme.next(new Theme(t));
    }

    public get themeName(): string {
        return this.$currentTheme.getValue().name;
    }

    public get currentThemeObservable(): Observable<Theme> {
        return this.$currentTheme.asObservable();
    }

    public get darkness(): boolean {
        return this.themeName === DARK_THEME;
    }

    /**
     * check if there is saved theme, then looks it up at theme repository
     */
    public getDefaultTheme(): Theme {
        return this.findTheme(themeLight.name);
    }

    /**
     * Find theme by specified theme
     * Always returns 'light' theme if no results
     */
    public findTheme(name: string): Theme {
        return this.themes.find(t => t.name === name) || themeLight;
    }

    /**
     * returns current theme index
     */
    public getCurrentThemeIndex(): number {
        return this.themes.findIndex(t => t.name === this.currentTheme.name);
    }

    /**
     * Switch to next theme, find current index
     * and if (current + 1) is out of index expression just go to themes[0]
     */
    public nextTheme(): void {
        const currentIndex = this.getCurrentThemeIndex();
        const isLast = currentIndex === (this.themes.length - 1);
        this.currentTheme = isLast ? this.themes[0] : this.themes[currentIndex + 1];
    }

    /**
     * Sets specified specified theme by name
     *
     * @param name is required
     */
    public setTheme(name: string): void {
        const t = this.findTheme(name);
        if (t.name !== name) {
            console.warn('Specified theme name not found: ', name);
        }
        this.currentTheme = t;
    }

    /**
     * Gets value of specified theme property
     *
     * @param propName is required
     */
    public getProperty(propName: string): string {
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
    public registerTheme(theme: Theme): void {
        if (!!this.themes.find(t => t.name === theme.name)) {
            theme.name = `custom_${theme.name}_${this.themes.length + 1}`;
        }
        this.themes.push(new Theme(theme));
    }


    public updateTheme(t: Theme): void {
        const theme = this.findTheme(t.name);
        if (theme.name === t.name) {
            this.currentTheme = new Theme(t);
        }
    }

}
