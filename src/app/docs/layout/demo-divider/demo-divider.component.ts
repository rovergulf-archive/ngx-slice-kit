import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-divider',
    templateUrl: './demo-divider.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoDividerComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Divider component example',
            subtitle: 'It may seem useless, but still usable',
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: '<sdk-divider></sdk-divider>',
                        module: `import { DividerModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add DividerModule to app imports
        DividerModule,
    ],
})
export class DemoDividerModule {
}`
                    },
                }
            ],
            apis: [],
        };
    }

}
