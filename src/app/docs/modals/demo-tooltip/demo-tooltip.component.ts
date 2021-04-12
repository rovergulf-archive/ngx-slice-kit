import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-tooltip',
    templateUrl: './demo-tooltip.component.html',
    styleUrls: ['./demo-tooltip.component.scss', '../../demo.module.scss']
})
export class DemoTooltipComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('clickRef', {static: true}) clickRef: any;
    @ViewChild('positionsRef', {static: true}) positionsRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Tooltip component example',
            subtitle: '',
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="tooltip-wrapper">
    <span sdkTooltip="Default tooltip">Default tooltip</span>
    <span delay="300" sdkTooltip="Injected humour, or non-characteristic words etc.">Delayed for 300ms</span>
    <span sdkTooltip="Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.">Long text</span>
    <span [delay]="1000" sdkTooltip="little text">Delayed for 1 second</span>
</div>`,
                        module: `import { TooltipModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add TooltipModule to app imports
        TooltipModule,
    ],
})
export class DemoTooltipModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-tooltip',
    templateUrl: './demo-tooltip.component.html',
    styleUrls: ['./demo-tooltip.component.scss']
})
export class DemoTooltipComponent {

    constructor() {
    }

}`,
                        styles: `.tooltip-wrapper {
    display: flex;

    span {
        margin: 0 40px;
    }
}`,
                    },
                },
                {
                    title: `Click to show`,
                    description: '',
                    templateRef: this.clickRef,
                    values: {
                        html: `<div class="tooltip-wrapper">
    <span [showOnClick]="true" sdkTooltip="Fishtext hola help">Click me</span>
    <span [showOnClick]="true"
    sdkTooltip=" It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.">Or me</span>
</div>`,
                    },
                },
                {
                    title: `Sticky position`,
                    description: 'There is also "offset" attribute available',
                    templateRef: this.positionsRef,
                    values: {
                        html: `<span offset="14" position="right" sdkTooltip="Site fish text">Right direction one</span>
<span position="left" sdkTooltip="Do you even fish, bro?">On the left</span>
<span position="bottom" sdkTooltip="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.">Down to the ground, if you are sitting right</span>`,
                    },
                },
            ],
            api_groups: [
                {
                    name: 'sdkTooltip directive',
                    apis: [
                        {
                            label: '[sdkTooltip]',
                            type: 'string',
                            required: true,
                            description: '',
                        }
                    ],
                },
            ],
        };
    }

}
