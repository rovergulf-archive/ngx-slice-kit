import { Component } from '@angular/core';

@Component({
    selector: 'sdk-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    public loader: string = 'default';

    constructor() {
    }
}
