import { Component, Input } from '@angular/core';
import { ApiDefinition } from '../../model';

type headerLabel = 'Attribute' | 'Method';

@Component({
    selector: 'lib-api-definitions-table',
    templateUrl: './api-def-table.component.html',
    styleUrls: ['./api-def-table.component.scss']
})
export class ApiDefTableComponent {

    @Input() apis: ApiDefinition[];
    @Input() typeVisible: boolean = true;
    @Input() descVisible: boolean = true;
    @Input() argsVisible: boolean = false;
    @Input() valueVisible: boolean = false;

    constructor() {
    }

}
