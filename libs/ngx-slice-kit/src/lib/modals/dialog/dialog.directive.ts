import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[sdkDialog]'
})
export class DialogDirective {

    constructor(
        public viewContainerRef: ViewContainerRef
    ) {
    }

}
