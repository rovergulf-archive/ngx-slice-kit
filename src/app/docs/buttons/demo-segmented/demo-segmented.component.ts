import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-segmented',
    templateUrl: './demo-segmented.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoSegmentedComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('regularRef', {static: true}) regularRef: any;

    page: DemoPageModel;

    constructor() {
    }

    // <h3>Simple button group / primary color</h3>
    // <h3>Simple button group / regular color</h3>

    ngOnInit(): void {
        this.page = {
            title: 'Segmented buttons example',
            subtitle: '',
            demos: [
                {
                    title: 'Default button group',
                    description: 'If color not set, it sets to "primary" as in ButtonComponent',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<sdk-button-group>
    <button sdk-flat-button>Button one</button>
    <button sdk-flat-button>Button two</button>
    <button sdk-flat-button>Button three</button>
</sdk-button-group>`,
                        module: `import { ButtonGroupModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add ButtonModule export
        ButtonGroupModule,
    ],
})
export class DemoButtonGroupModule {
}`,
                    },
                },
                {
                    title: 'Using regular color',
                    description: '',
                    templateRef: this.regularRef,
                    values: {
                        html: `<sdk-button-group color="regular">
    <button sdk-flat-button color="regular">Button one</button>
    <button sdk-flat-button color="regular">Button two</button>
    <button sdk-flat-button color="regular">Button three</button>
    <button sdk-flat-button color="regular">Button four</button>
    <button sdk-flat-button color="regular">Button five</button>
</sdk-button-group>`,
                    },
                },
            ],
            apis: [
                {
                    label: '[color]',
                    type: 'string',
                    description: 'Sets the color of the button group. Available colors: "primary", "regular", "success", "accent", "warn". "primary" is color by default',
                },
            ]
        };
    }

}
