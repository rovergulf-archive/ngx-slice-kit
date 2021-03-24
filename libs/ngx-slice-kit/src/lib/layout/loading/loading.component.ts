import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sdk-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    loader: string = 'default';

    constructor() {
    }

    ngOnInit(): void {
    }

}
