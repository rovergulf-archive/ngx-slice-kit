import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[sdkAlert]'
})
export class AlertDirective {

    constructor(
        public viewContainerRef: ViewContainerRef
    ) {
    }

}
