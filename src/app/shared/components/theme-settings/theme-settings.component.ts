import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorProperty, Theme, ThemeService } from 'ngx-slice-kit';
import { ApiDefinition } from '../../model';
import { baseColors, colors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';

@Component({
    selector: 'lib-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.component.scss']
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {

    @Input() theme: Theme;

    constructor(
        public themeService: ThemeService
    ) {
    }

    get colorNames(): string[] {
        return [...baseColors, ...colors];
    }

    apply(): void {
        this.themeService.setTheme(this.theme.name);
    }

    getCurrentThemesDefs(): ApiDefinition[] {
        const themesDefinitions = [];
        Object.keys(this.theme).forEach(k => {
            if (k !== 'name' && k !== 'colors') {
                themesDefinitions.push(new ApiDefinition({
                    label: k,
                    type: '',
                    value: `rgb(${this.theme[k]})`,
                }));
            }
        });
        return themesDefinitions.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
    }

    onNewThemePush(theme: Theme): void {
        this.themeService.registerTheme(theme);
        this.themeService.setTheme(theme.name);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
