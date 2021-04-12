import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-accordion',
    templateUrl: './demo-accordion.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoAccordionComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Accordion component example',
            subtitle: ``,
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: ``,
                        module: `import { AccordionModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add AccordionModule to app imports
        AccordionModule,
    ],
})
export class DemoAccordionModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-accordion',
    templateUrl: './demo-accordion.component.html',
    styleUrls: ['./demo-accordion.component.scss']
})
export class DemoAccordionComponent {

    constructor() {
    }

}`,
                    },
                },
            ],
            api_groups: [
                {
                    name: 'AccordionComponent',
                    apis: [
                        {
                            label: '',
                            type: '',
                            description: '',
                        }
                    ],
                },
            ],
        };
    }

}
