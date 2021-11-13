import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDirective } from './theme.directive';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './symbols';
import { themeLight } from './lib/theme-light';
import { themeDark } from './lib/theme-dark';

@NgModule({
    imports: [CommonModule],
    declarations: [ThemeDirective],
    exports: [ThemeDirective]
})
export class ThemeModule {
    public static forRoot(options?: ThemeOptions): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: [
                {
                    provide: THEMES,
                    useValue: options.themes || [themeLight, themeDark]
                },
                {
                    provide: ACTIVE_THEME,
                    useValue: options.active || themeLight.name
                }
            ]
        };
    }
}
