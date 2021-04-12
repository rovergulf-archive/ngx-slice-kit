import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';
import { AlertService } from '../../../../../libs/ngx-slice-kit/src/lib/modals/alert/alert.service';

@Component({
    selector: 'app-demo-pagination',
    templateUrl: './demo-pagination.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoPaginationComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('smallRef', {static: true}) smallRef: any;

    page: DemoPageModel;

    params = {
        page: 1,
        count: 128,
        limit: 10,
        offset: 0,
    };

    constructor(
        private alerts: AlertService,
    ) {
    }

    setPage(page: number): void {
        this.params.offset = this.params.limit * (page - 1);
        this.params.page = page;
    }


    ngOnInit(): void {
        this.page = {
            title: 'Pagination component example',
            subtitle: '',
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<sdk-pagination (changed)="setPage($event)"
    [count]="params.count"
    [limit]="params.limit"
    [page]="params.pageNum"></sdk-pagination>`,
                        module: `import { PaginationModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add PaginationModule to app imports
        PaginationModule,
    ],
})
export class DemoPaginationModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-pagination',
    templateUrl: './demo-pagination.component.html',
    styleUrls: ['./demo-pagination.component.scss']
})
export class DemoPaginationComponent {

    params = {
        pageNum: 1,
        count: 128,
        limit: 10,
        offset: 0,
    };

    constructor() {
    }

}`,
                    },
                },
                {
                    title: 'Small example',
                    description: '',
                    templateRef: this.smallRef,
                    values: {
                        html: `<sdk-pagination (changed)="setPage($event)"
    [count]="params.count" [limit]="params.limit"
    [page]="params.pageNum" [small]="true"></sdk-pagination>`,
                    },
                },
            ],
            api_groups: [
                {
                    name: 'PaginationComponent',
                    apis: [
                        {
                            label: '(changed)',
                            type: 'EventEmitter<number>',
                            description: 'Emits current page value on change',
                        },
                        {
                            label: '[count]',
                            type: 'number',
                            description: '',
                            default_value: 0,
                        },
                        {
                            label: '[limit]',
                            type: 'number',
                            description: '',
                            default_value: 0,
                        },
                        {
                            label: '[page]',
                            type: 'number',
                            description: '',
                            default_value: 1,
                        },
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: '',
                            default_value: false
                        },
                    ],
                }
            ],
        };
    }

    ngOnDestroy(): void {
    }

}
