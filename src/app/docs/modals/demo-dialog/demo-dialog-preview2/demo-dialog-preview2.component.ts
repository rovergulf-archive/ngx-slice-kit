import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-demo-dialog-preview2',
    templateUrl: './demo-dialog-preview2.component.html',
    styleUrls: ['./demo-dialog-preview2.component.scss']
})
export class DemoDialogPreview2Component {

    @Output() resultEvent = new EventEmitter();

    constructor() {
    }

    close(result: any): void {
        this.resultEvent.emit(result);
    }

}
