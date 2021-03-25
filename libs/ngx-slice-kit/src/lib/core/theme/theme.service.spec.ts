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

    it('should', () => {
        const themeName = 'dark';
        const theme = service.findTheme(themeName);

        expect(theme.name).toEqual(themeName);
    });

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

});
