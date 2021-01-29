import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-demo-dialog-preview2',
    templateUrl: './demo-dialog-preview2.component.html',
    styleUrls: ['./demo-dialog-preview2.component.scss']
})
export class DemoDialogPreview2Component implements OnInit, OnDestroy {

    @Output() result = new EventEmitter();

    constructor() {
    }

    close(result: any): void {
        this.result.emit(result);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
