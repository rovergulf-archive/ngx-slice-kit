import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ThemingComponent implements OnInit, OnDestroy {

    coreStylesExample = `@import './libs/ngx-slice-kit/src/lib/core/styles/core';`;
    angularJson = angularJsonExampleRef;

    themesDefinitions: ApiDefinition[];
    themes: Theme[] = [];

    constructor(
        public themeService: ThemeService,
        private layoutService: LayoutService,
    ) {
    }

    ngOnInit(): void {
        this.themes = this.themeService.themes;
        // this.themes = [...this.themeService.themes, new Theme({name: 'custom', ...defaultColors})];
    }

    ngOnDestroy(): void {
    }

}
