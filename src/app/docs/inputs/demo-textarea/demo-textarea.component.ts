import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-textarea',
    templateUrl: './demo-textarea.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoTextareaComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('noResizeRef', {static: true}) noResizeRef: any;
    @ViewChild('labelRef', {static: true}) labelRef: any;
    @ViewChild('captionsRef', {static: true}) captionsRef: any;
    @ViewChild('fullWidthRef', {static: true}) fullWidthRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Textarea component examples',
            subtitle: `Textarea provides native <textrarea> component.`,
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<sdk-textarea></sdk-textarea>`,
                        module: `import { TextareaModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add TextareaModule to app imports
        TextareaModule,
    ],
})
export class DemoTextareaModule {
}`,
                    },
                },
                {
                    title: 'Specify label and placeholder values',
                    description: '',
                    templateRef: this.labelRef,
                    values: {
                        html: `<sdk-textarea label="Label text" placeholder="Placeholder text"></sdk-textarea>`,
                    },
                },
                {
                    title: 'Restrict textarea resize',
                    description: '',
                    templateRef: this.noResizeRef,
                    values: {
                        html: `<sdk-textarea [resizable]="false" placeholder="Not resizable"></sdk-textarea>`,
                    },
                },
                {
                    title: 'Caption and error texts',
                    description: '',
                    templateRef: this.captionsRef,
                    values: {
                        html: `<sdk-textarea error="Error text" placeholder="Placeholder text"></sdk-textarea>
<sdk-textarea [small]="true" caption="Caption text"></sdk-textarea>`,
                    },
                },
                {
                    title: 'Full width sized textarea',
                    description: '',
                    templateRef: this.fullWidthRef,
                    values: {
                        html: `<sdk-textarea [fullWidth]="true" Label="Full width caption"></sdk-textarea>`,
                    },
                },
            ],
            apis: [
                {
                    label: '[label]',
                    type: 'string',
                    description: 'Label value',
                },
                {
                    label: '[placeholder]',
                    type: 'string',
                    description: 'Placeholder value',
                },
                {
                    label: '[resizable]',
                    type: 'boolean',
                    description: 'Enables resize for textarea',
                },
                {
                    label: '[fullWidth]',
                    type: 'boolean',
                    description: 'Sets size of textarea for 100% width'
                },
                {
                    label: '[caption]',
                    type: 'string',
                    description: 'Caption text below textarea',
                },
                {
                    label: '[error]',
                    type: 'string',
                    description: 'Error caption text value',
                },
                {
                    label: '[disabled]',
                    type: 'boolean',
                    description: 'Disable component interaction',
                },
            ],
        };
    }

}
