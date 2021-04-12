import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiDefinition } from '../../shared/model';

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

    colorPaletteDefinitions: ApiDefinition[];

    constructor() {
    }

    ngOnInit(): void {
        this.colorPaletteDefinitions = [
            {
                label: 'name',
                type: 'string',
            },
        ].map(src => new ApiDefinition(src));
    }

}
