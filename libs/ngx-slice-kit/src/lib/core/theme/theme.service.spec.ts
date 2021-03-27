import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import {skip} from 'rxjs/operators';

describe('ThemeService', () => {
    let service: ThemeService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemeService]
        });
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should #findTheme return correct theme by name', () => {
        const themeName = 'dark';
        const theme = service.findTheme(themeName);

        expect(theme.name).toEqual(themeName);
    });

    it('should #getCurrentThemeIndex be 0 by default, because of light theme', () => {
        expect(service.getCurrentThemeIndex()).toEqual(0);
    });

    it('should #getCurrentThemeIndex be 1 if was set dark theme ', () => {
        service.setTheme('dark');
        expect(service.getCurrentThemeIndex()).toEqual(1);
    });

    it('should #getDefaultTheme return light theme', () => {
        expect(service.getDefaultTheme()).toEqual(service.themes[0]);
    });

    it('should #themeName return correct name', () => {
        expect(service.themeName).toEqual('light', 'should name of default theme be "light"');
        service.setTheme('dark');
        expect(service.themeName).toEqual('dark');
    });

    it('should #darkness return false if current theme is not dark', () => {
        expect(service.darkness).toBeFalse(); // light theme by default
    });

    it('should #darkness return true if current theme is dark', () => {
        service.setTheme('dark');
        expect(service.darkness).toBeTrue();
    });

    it('should #currentTheme getter return correct value', () => {
        let expTheme = service.themes[0];
        expect(service.currentTheme).toEqual(expTheme);

        expTheme = service.themes[1];
        service.setTheme('dark');
        expect(service.currentTheme.name).toEqual(expTheme.name);
    });

    it('should #currentTheme setter set correctly theme', () => {
        const dummyTheme = service.themes[1];

        service.currentThemeObservable.pipe(skip(1)).subscribe(res => {
            expect(res.name).toEqual(dummyTheme.name);
        });

        service.currentTheme = dummyTheme;
    });

    it('should #nextTheme set next theme in themes list', () => {
        expect(service.currentTheme.name).toEqual(service.themes[0].name);
        service.nextTheme();
        expect(service.currentTheme.name).toEqual(service.themes[1].name);
        service.nextTheme();
        expect(service.currentTheme.name).toEqual(service.themes[0].name);
    });

    it('should #setTheme correctly set theme by theme name if it exists', () => {
        expect(service.currentTheme.name).toEqual('light');
        service.setTheme('dark');
        expect(service.currentTheme.name).toEqual('dark');
    });

    it('should #setTheme show warn in console if theme name is not exists ', () => {
        spyOn(console, 'warn');
        expect(service.currentTheme.name).toEqual('light');
        service.setTheme('blue');
        expect(service.currentTheme.name).toEqual('light');
        expect(console.warn).toHaveBeenCalled();
    });

    it('should #getProperty return property if theme has it, or return empty string', () => {
        const name = 'light';
        const accent = '241,201,79';
        const blueberryPie = '';

        expect(service.getProperty('name')).toEqual(name);
        expect(service.getProperty('accent')).toEqual(accent);
        expect(service.getProperty('blueberry_pie')).toEqual(blueberryPie);
    });

    it('should #updateTheme do nothing if theme is not exists', () => {
        const accent = service.currentTheme.accent;
        const newAccent = '6, 6, 6';
        const theme = {...service.currentTheme, accent: newAccent, name: 'scarlet'};

        service.updateTheme(theme);
        expect(service.currentTheme.accent).toEqual(accent);
    });

    it('should #updateTheme update existed theme properties', () => {
        const newAccent = '6, 6, 6';
        const theme = {...service.currentTheme, accent: newAccent};

        service.updateTheme(theme);
        expect(service.currentTheme.accent).toEqual(newAccent);
    });

    it('should #registerTheme add prefix for theme name if it already exists', () => {
        const theme = {...service.currentTheme};
        service.registerTheme(theme);
        const customLightThemeName = service.themes.find(t => t.name === 'custom_light_3');

        expect(service.themes.length).toEqual(3);
        expect(customLightThemeName).toBeTruthy();
    });

    it('should #register add theme with original name if no duplicate', () => {
        const theme = {...service.currentTheme, name: 'indigo'};
        service.registerTheme(theme);
        const indigoTheme = service.themes.find(t => t.name === 'indigo');

        expect(service.themes.length).toEqual(3);
        expect(indigoTheme).toBeTruthy();
    });
});
