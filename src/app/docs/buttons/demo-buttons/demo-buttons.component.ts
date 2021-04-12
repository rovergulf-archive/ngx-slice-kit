import {Component, OnInit, ViewChild} from '@angular/core';
import {DemoPageModel} from '../../../shared/model';

@Component({
    selector: 'app-demo-buttons',
    templateUrl: './demo-buttons.component.html',
    styleUrls: ['./demo-buttons.component.scss', '../../docs.module.scss']
})
export class DemoButtonsComponent implements OnInit {

    @ViewChild('basicRef', {static: true}) basicRef: any;
    @ViewChild('flatRef', {static: true}) flatRef: any;
    @ViewChild('flatSmallRef', {static: true}) flatSmallRef: any;
    @ViewChild('raisedRef', {static: true}) raisedRef: any;
    @ViewChild('borderRef', {static: true}) borderRef: any;
    @ViewChild('wideRaisedRef', {static: true}) wideRaisedRef: any;
    @ViewChild('fullWidthRef', {static: true}) fullWidthRef: any;
    @ViewChild('roundRef', {static: true}) roundRef: any;
    @ViewChild('roundSmallRef', {static: true}) roundSmallRef: any;
    @ViewChild('iconRef', {static: true}) iconRef: any;
    @ViewChild('iconSmallRef', {static: true}) iconSmallRef: any;
    @ViewChild('withIconRef', {static: true}) withIconRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Button component examples',
            subtitle: 'Sdk-slice-kit buttons are native <button> and <a> elements enhanced with our styles and animations',
            demos: [
                {
                    title: 'Basic Buttons',
                    description: '',
                    templateRef: this.basicRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-base-button>Primary</button>
        <button sdk-base-button color="regular">Regular</button>
        <button sdk-base-button color="success">Success</button>
        <button sdk-base-button color="accent">Accent</button>
        <button sdk-base-button color="warn">Warn</button>
        <button sdk-base-button disabled>Disabled</button>
        <a sdk-base-button routerLink=".">Link</a>
    </div>
</div>`,
                        module: `import { ButtonModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add ButtonModule to app imports
        ButtonModule,
    ],
})
export class DemoButtonModule {
}`,
                        styles: `.example {
    button, a {
        margin: 8px;
    }
}`
                    },
                },
                {
                    title: 'Flat buttons',
                    description: '',
                    templateRef: this.flatRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-flat-button>Primary</button>
        <button sdk-flat-button color="regular">Regular</button>
        <button sdk-flat-button color="success">Success</button>
        <button sdk-flat-button color="accent">Accent</button>
        <button sdk-flat-button color="warn">Warn</button>
        <button sdk-flat-button disabled>Disabled</button>
        <a sdk-flat-button routerLink=".">Link</a>
    </div>
</div>`
                    }
                },
                {
                    title: 'Flat small buttons',
                    description: '',
                    templateRef: this.flatSmallRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-flat-button [small]="true">Primary</button>
        <button sdk-flat-button color="regular" [small]="true">Regular</button>
        <button sdk-flat-button color="success" [small]="true">Success</button>
        <button sdk-flat-button color="accent" [small]="true">Accent</button>
        <button sdk-flat-button color="warn" [small]="true">Warn</button>
        <button sdk-flat-button disabled [small]="true">Disabled</button>
        <a sdk-flat-button routerLink="." [small]="true">Link</a>
    </div>
</div>`
                    }
                },
                {
                    title: 'Raised buttons',
                    description: '',
                    templateRef: this.raisedRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-raised-button>Primary</button>
        <button sdk-raised-button color="regular">Regular</button>
        <button sdk-raised-button color="success">Success</button>
        <button sdk-raised-button color="accent">Accent</button>
        <button sdk-raised-button color="warn">Warn</button>
        <button sdk-raised-button disabled>Disabled</button>
        <a sdk-raised-button routerLink=".">Link</a>
    </div>
</div>`
                    }
                },
                {
                    title: 'Border buttons',
                    description: '',
                    templateRef: this.borderRef,
                    values: {
                        html: `<div class="example flex-row flex-wrap layout-start-center">
    <button sdk-stroked-button>Primary</button>
    <button sdk-stroked-button color="regular">Regular</button>
    <button sdk-stroked-button color="success">Success</button>
    <button sdk-stroked-button color="accent">Accent</button>
    <button sdk-stroked-button color="warn">Warn</button>
    <button sdk-stroked-button disabled>Disabled</button>
    <a sdk-stroked-button routerLink=".">Link</a>
</div>`
                    }
                },
                {
                    title: 'Wide raised buttons (min-width: 200px)',
                    description: '',
                    templateRef: this.wideRaisedRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-raised-button size="wide">Primary</button>
        <button sdk-raised-button size="wide" color="regular">Regular</button>
        <button sdk-raised-button size="wide" color="success">Success</button>
        <button sdk-raised-button size="wide" color="accent">Accent</button>
        <button sdk-raised-button size="wide" color="warn">Warn</button>
        <button sdk-raised-button size="wide" disabled>Disabled</button>
        <a sdk-raised-button size="wide" routerLink=".">Link</a>
    </div>
</div>`
                    }
                },
                {
                    title: 'Full-width flat buttons',
                    description: '',
                    templateRef: this.fullWidthRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example full-width flex-row flex-wrap layout-start-center">-->
        <button sdk-flat-button size="full-width">Primary</button>
        <button sdk-flat-button size="full-width" color="regular">Regular</button>
        <button sdk-flat-button size="full-width" color="success">Success</button>
        <button sdk-flat-button size="full-width" color="accent">Accent</button>
        <button sdk-flat-button size="full-width" color="warn">Warn</button>
        <button sdk-flat-button size="full-width" disabled>Disabled</button>
    </div>
</div>`
                    }
                },
                {
                    title: 'Round buttons',
                    description: '',
                    templateRef: this.roundRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-round-button>Primary</button>
        <button sdk-round-button color="regular">Regular</button>
        <button sdk-round-button color="success">Success</button>
        <button sdk-round-button color="accent">Accent</button>
        <button sdk-round-button color="warn">Warn</button>
        <button sdk-round-button disabled>Disabled</button>
    </div>
</div>`
                    }
                },
                {
                    title: 'Round small buttons',
                    description: '',
                    templateRef: this.roundSmallRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-round-button [small]="true">Primary</button>
        <button sdk-round-button [small]="true" color="regular">Regular</button>
        <button sdk-round-button [small]="true" color="success">Success</button>
        <button sdk-round-button [small]="true" color="accent">Accent</button>
        <button sdk-round-button [small]="true" color="warn">Warn</button>
        <button sdk-round-button [small]="true" disabled>Disabled</button>
    </div>
</div>`
                    }
                },
                {
                    title: 'Icon buttons',
                    description: '',
                    templateRef: this.iconRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-icon-button>
            <sdk-icon></sdk-icon>
        </button>
        <button sdk-icon-button color="regular">
            <sdk-icon icon="android"></sdk-icon>
        </button>
        <button sdk-icon-button color="success">
            <sdk-icon icon="github"></sdk-icon>
        </button>
        <button sdk-icon-button color="accent">
            <sdk-icon icon="rovergulf"></sdk-icon>
        </button>
        <button sdk-icon-button color="warn">
            <sdk-icon icon="telegram"></sdk-icon>
        </button>
        <button sdk-icon-button color="basic">
            <sdk-icon icon="linkedin"></sdk-icon>
        </button>
    </div>
</div>`
                    }
                },
                {
                    title: 'Icon small buttons',
                    description: '',
                    templateRef: this.iconSmallRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-icon-button [small]="true">
            <sdk-icon size="16"></sdk-icon>
        </button>
        <button sdk-icon-button [small]="true" color="regular">
            <sdk-icon size="16" icon="android"></sdk-icon>
        </button>
        <button sdk-icon-button [small]="true" color="success">
            <sdk-icon size="16" icon="github"></sdk-icon>
        </button>
        <button sdk-icon-button [small]="true" color="accent">
            <sdk-icon size="16" icon="rovergulf"></sdk-icon>
        </button>
        <button sdk-icon-button [small]="true" color="warn">
            <sdk-icon size="16" icon="telegram"></sdk-icon>
        </button>
        <button sdk-icon-button [small]="true" color="basic">
            <sdk-icon size="16" icon="linkedin"></sdk-icon>
        </button>
    </div>
</div>`
                    }
                },
                {
                    title: 'Buttons with icon',
                    description: '',
                    templateRef: this.withIconRef,
                    values: {
                        html: `<div class="flex-column">
    <div class="example flex-row flex-wrap layout-start-center">
        <button sdk-flat-button color="regular">
            <sdk-icon></sdk-icon>
            <span>Primary</span>
        </button>
        <button sdk-flat-button color="regular">
            <span>Regular</span>
            <sdk-icon></sdk-icon>
        </button>
        <button sdk-flat-button color="regular" disabled>
            <sdk-icon></sdk-icon>
            <span>Disabled</span>
        </button>
        <a sdk-flat-button routerLink=".">Link</a>
    </div>
</div>`
                    }
                }
            ],
            apis: [
                {
                    label: 'color',
                    type: 'string',
                    description: 'Sets the color of the button. Available colors: "primary", "regular", "success", "accent", "warn". "primary" is color by default',
                },
                {
                    label: 'size',
                    type: 'string',
                    description: 'Change the button width different from default. Available sizes: "wide", "full-width"',
                },
                {
                    label: 'small',
                    type: 'boolean',
                    description: '',
                },
                {
                    label: 'disabled',
                    type: 'boolean',
                    description: '',
                },
            ],
        };
    }

}
