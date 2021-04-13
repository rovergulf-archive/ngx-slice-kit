import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Theme, ThemeService } from 'ngx-slice-kit';
import { ApiDefinition } from '../../model';
import { baseColors, colors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'lib-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.component.scss']
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {

    private $theme: BehaviorSubject<Theme> = new BehaviorSubject<any>(undefined);

    @Input() set theme(theme: Theme) {
        this.$theme.next(theme);
    }

    get theme(): Theme {
        return this.$theme.getValue();
    }

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

    onThemeEmit(theme: Theme): void {
        this.$theme.next(new Theme({...theme, name: this.theme.name}));
        // this.themeService.registerTheme(theme);
        // this.themeService.setTheme(theme.name);
    }

    applyTheme(): void {
        this.themeService.setTheme(this.theme.name);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
