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
    @ViewChild('captionRef', {static: true}) captionRef: any;
    @ViewChild('sizeRef', {static: true}) sizeRef: any;

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
            title: 'Input component examples',
            subtitle: '',
            demos: [
                {
                    title: 'Default',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="input-container">
    <div class="container-half">
        <sdk-input [autofocus]="true" placeholder="Placeholder text">ng-content</sdk-input>
        <sdk-input [small]="true" label="small"></sdk-input>
        <sdk-input placeholder="No label around"></sdk-input>
    </div>
    <div class="container-half">
        <sdk-input [(ngModel)]="someString" label="label"></sdk-input>
        <sdk-input [small]="true" [disabled]="true" placeholder="Placeholder text">disabled</sdk-input>
        <sdk-input [small]="true" placeholder="Small no label"></sdk-input>
    </div>
</div>`,
                        styles: `.input-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .container-half {
        width: 50%;
        min-width: 320px;
    }

    sdk-input {
        margin: 0 16px 16px 0;
    }
}`,
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

    someString: string = 'some string';

    constructor() {
    }

}`,
                    },
                },
                {
                    title: 'Caption & error',
                    description: '',
                    templateRef: this.captionRef,
                    values: {
                        html: `<div class="input-container">
    <div class="container-half">
        <sdk-input caption="Text caption" label="Default input's min-width is 160px"></sdk-input>
        <sdk-input [error]="'Must be filled'" required error="Error caption" label="Error demonstration"></sdk-input>
    </div>
    <div class="container-half">
        <sdk-input caption="Text caption" [small]="true" label="And max-width – 288px"></sdk-input>
        <sdk-input [caption]="'Error has separate caption message'"
                   [error]="'Example error caption'"
                   [small]="true"
                   placeholder="Aight! What a mess!"
                   label="Small error demo">Text input
        </sdk-input>
    </div>
</div>`,
                    },
                },
                {
                    title: 'Input size',
                    description: '',
                    templateRef: this.sizeRef,
                    values: {
                        html: `<div class="input-container">
    <sdk-input size="wide" label="Wide input depends on your label size and its length"></sdk-input>
    <sdk-input size="full-width" class="flex-grow-1" label="Full width label"></sdk-input>
</div>`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'InputComponent',
                    apis: [
                        {
                            label: '[type]',
                            type: 'string',
                            description: `-`,
                            default_value: 'text'
                        },
                        {
                            label: '[placeholder]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[size]',
                            type: 'string',
                            description: `The size attribute defines input component width. Available values: "wide" | "full-width"`,
                        },
                        {
                            label: '[caption]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[error]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[autocomplete]',
                            type: 'string',
                            description: `Available values: "on" | "off"`,
                            default_value: 'off'
                        },
                        {
                            label: '[tabindex]',
                            type: 'number',
                            description: `-`,
                        },
                        {
                            label: '[min]',
                            type: 'number',
                            description: `The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute. Valid for the numeric input types`,
                        },
                        {
                            label: '[max]',
                            type: 'number',
                            description: `The min attribute defines the maximum value that is acceptable and valid for the input containing the attribute. Valid for the numeric input types`,
                        },
                        {
                            label: '[autofocus]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },

                        {
                            label: '[small]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[disabled]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[required]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                    ],
                },
            ]
        };
    }

}
