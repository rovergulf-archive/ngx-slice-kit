import { Component, Input, OnInit } from '@angular/core';
import { ApiDefinition } from '../../model';

@Component({
    selector: 'lib-api-definitions-table',
    templateUrl: './api-def-table.component.html',
    styleUrls: ['./api-def-table.component.scss']
})
export class ApiDefTableComponent implements OnInit {

    @Input() apis: ApiDefinition[];
    @Input() typeVisible: boolean = true;
    @Input() descVisible: boolean = true;
    @Input() attrsVisible: boolean = false;
    @Input() valueVisible: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
