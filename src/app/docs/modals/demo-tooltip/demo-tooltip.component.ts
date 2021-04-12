import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-tooltip',
    templateUrl: './demo-tooltip.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoTooltipComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

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
                        html: '',
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
                    },
                }
            ],
            apis: [
                {
                    label: '',
                    type: '',
                    description: '',
                }
            ],
        };
    }

}
