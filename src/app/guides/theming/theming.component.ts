import { Component, OnInit } from '@angular/core';
import { ApiDefinition } from '../../shared/model';
import { ThemeService } from '../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.service';
import { LayoutService } from '../../shared/services';

@Component({
    selector: 'app-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss', '../guides.module.scss']
})
export class ThemingComponent implements OnInit {

    coreStylesExample = `@import './libs/ngx-slice-kit/src/lib/core/styles/core';`;
    fontStylesExample = `@import './libs/ngx-slice-kit/src/lib/core/styles/typography';`;
    colorPaletteExample = `class ColorPalette {
    value: string;
    text_value?: string;
    background: string;
    name: string;
    text?: string;
    prop?: string;
    alpha?: number;
    rgb?: string;
    hex?: string;
}`;

    themesDefinitions: ApiDefinition[];

    constructor(
        private themeService: ThemeService,
        private layoutService: LayoutService,
    ) {
    }

    getCurrentThemesDefs(): ApiDefinition[] {
        const currentTheme = this.themeService.themes.find(t => t.name === this.layoutService.themeName);
        const themesDefinitions = [];
        Object.keys(currentTheme).forEach(k => {
            if (k !== 'name') {
                themesDefinitions.push(new ApiDefinition({
                    label: k,
                    type: 'rgb-raw value',
                    value: currentTheme[k],
                }));
            }
        });
        return themesDefinitions;
    }

    ngOnInit(): void {
    }

}
