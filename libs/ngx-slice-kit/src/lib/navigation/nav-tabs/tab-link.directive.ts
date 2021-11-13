import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[sdkTabLink]'
})
export class TabLinkDirective {
    @Input() public label: string;
    @Input() public routerLink: string;
    @Input() public disabled: boolean = false;

    @HostBinding('class')
    public elementClass = 'sdk-tab-container__tab';


    constructor() {
    }
}
