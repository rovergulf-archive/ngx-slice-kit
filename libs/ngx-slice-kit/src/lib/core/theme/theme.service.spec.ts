import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

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

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

});
