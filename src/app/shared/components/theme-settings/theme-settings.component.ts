import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Theme, ThemeService } from 'ngx-slice-kit';
import { ApiDefinition } from '../../model';
import { baseColors, colors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';
import { BehaviorSubject, timer } from 'rxjs';
import { LayoutService } from '../../services';

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
        public themeService: ThemeService,
        private layout: LayoutService
    ) {
    }

    get colorNames(): string[] {
        return [...baseColors, ...colors];
    }

    get active(): boolean {
        return this.themeService.currentTheme.name === this.theme.name;
    }

    apply(): void {
        const existing = this.themeService.findTheme(this.theme.name);
        if (!existing || existing.name !== this.theme.name) {
            this.themeService.registerTheme(this.theme);
        }
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
