import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'ngx-slice-kit';

@Component({
    selector: 'app-demo-inputs',
    templateUrl: './demo-inputs.component.html',
    styleUrls: ['./demo-inputs.component.scss']
})
export class DemoInputsComponent implements OnInit {

    iconUrl1 = `url(assets/icons/theme-${this.themeService.themeName}/star.svg)`;
    inputStyle1 = {
        'background-image': `url(assets/icons/theme-${this.themeService.themeName}/star.svg)`,
        'background-position': '8px center',
        'background-size': '24px 24px',
        'background-repeat': 'no-repeat',
        'padding-left': '40px',
        'background-color': 'var(--regular-disabled)'
    };
    someString: string = 'some string';

    constructor(
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
    }

}
