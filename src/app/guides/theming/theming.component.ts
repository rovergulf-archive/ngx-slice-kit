import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from 'ngx-slice-kit';
import { ApiDefinition } from '../../shared/model';
import { LayoutService } from '../../shared/services';
import { angularJsonExampleRef } from '../get-started/get-started.component';
import { timer } from 'rxjs';
import { defaultColors } from '../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';

@Component({
    selector: 'app-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss', '../guides.module.scss']
})
export class ThemingComponent implements OnInit {

    coreStylesExample = `@import '~ngx-slice-kit/src/lib/core/styles/core';`;
    angularJson = angularJsonExampleRef;

    themesDefinitions: ApiDefinition[];
    themes: Theme[] = [];

    constructor(
        public themeService: ThemeService,
        private layoutService: LayoutService,
    ) {
    }

    addTheme(): void {
        this.themeService.registerTheme(new Theme({...defaultColors, name: 'new_theme'}));
    }

    ngOnInit(): void {
        this.themes = this.themeService.themes;
    }

}
