import { Component, Input, OnInit } from '@angular/core';
import { ColorProperty, ThemeService } from 'ngx-slice-kit';

const alphaLimit = 100;
const alphaStep = 10;
const backgroundColor = 'background';

@Component({
    selector: 'lib-theme-color',
    templateUrl: './theme-color.component.html',
    styleUrls: ['./theme-color.component.scss']
})
export class ThemeColorComponent implements OnInit {

    @Input() color: ColorProperty;
    palette: ColorProperty[] = [];
    showPalette: boolean = false;

    constructor(
        private themeService: ThemeService
    ) {
    }

    fillPalette(): void {
        for (let i = alphaLimit; i >= alphaStep; i = i - alphaStep) {
            const {name, value, text_value, background} = this.color;
            const colorName = i === 100 ? name : `${name}-a${i}`;
            const bgVal = background.replace('rgb(', '').replace(')', '');
            this.palette.push(new ColorProperty({
                name: `var(--${colorName}-rgb)`,
                alpha: i,
                value,
                background: bgVal,
                text_value,
            }));
        }
    }

    ngOnInit(): void {
        this.fillPalette();
    }

}
