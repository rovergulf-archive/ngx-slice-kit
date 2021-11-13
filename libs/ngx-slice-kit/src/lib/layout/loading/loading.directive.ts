import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Directive({
    selector: '[sdkLoading]'
})
export class LoadingDirective {
    @Input()
    public loader: string;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver
    ) {
    }

    @Input('sdkLoading')
    public set ngIf(val: any) {
        if (!val) {
            const factory = this.resolver.resolveComponentFactory(LoadingComponent);

            this.vcRef.createComponent(factory);
        }
    }
}
