import {Component, OnInit, ViewChild} from '@angular/core';

import { ThemeService } from 'ngx-slice-kit';
import {DemoPageModel} from '../../../shared/model';

@Component({
    selector: 'app-demo-inputs',
    templateUrl: './demo-inputs.component.html',
    styleUrls: ['./demo-inputs.component.scss']
})
export class DemoInputsComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('statesRef', {static: true}) statesRef: any;

    page: DemoPageModel;

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

    getIconUrl1(): string {
        return `url(assets/icons/theme-${this.themeService.themeName}/star.svg)`;
    }

    ngOnInit(): void {
        this.page = {
            title: '',
            subtitle: '',
            demos: [
                {
                    title: '',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: ``,
                        module: `import { InputModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add InputModule to app imports
        InputModule,
    ],
})
export class DemoInputModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-input',
    templateUrl: './demo-input.component.html',
    styleUrls: ['./demo-input.component.scss']
})
export class DemoInputComponent {

    constructor() {
    }

}`,
                    },
                }
            ],
            api_groups: [
            ]
        };
    }

}
