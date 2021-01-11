import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[sdkTabLink]'
})
export class TabLinkDirective {
    @Input() active: boolean = false;
    @Input() label: string;
    @Input() routerLink: string;
    @Input() disabled: boolean = false;

    @HostBinding('class')
    elementClass = 'sdk-tab-container__tab';


    constructor() {
    }
}
