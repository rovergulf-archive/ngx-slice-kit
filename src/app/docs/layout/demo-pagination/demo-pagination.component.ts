import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-pagination',
    templateUrl: './demo-pagination.component.html',
    styleUrls: ['../../demo.module.scss']
})
export class DemoPaginationComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    pageNum: number = 1;
    count: number = 128;
    limit: number = 10;
    offset: number = 0;

    constructor() {
    }

    setPage(page): void {
        this.offset = this.limit * (page - 1);
        this.pageNum = page;
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
                        html: '',
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
                        component: ``,
                    },
                }
            ],
            apis: [],
        };
    }

    ngOnDestroy(): void {
    }

}
