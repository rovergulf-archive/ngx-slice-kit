import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from 'ngx-slice-kit';
import { ApiDefinition } from '../../shared/model';
import { LayoutService } from '../../shared/services';
import { angularJsonExampleRef } from '../get-started/get-started.component';

@Component({
    selector: 'app-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss', '../guides.module.scss']
})
export class ThemingComponent implements OnInit {

    coreStylesExample = `@import './libs/ngx-slice-kit/src/lib/core/styles/core';`;
    angularJson = angularJsonExampleRef;

    themes: Theme[];

    themesDefinitions: ApiDefinition[];

    constructor(
        private themeService: ThemeService,
        private layoutService: LayoutService,
    ) {
    }

    ngOnInit(): void {
        this.themes = this.themeService.themes;
        console.log(this.themeService.themes);
    }

}
