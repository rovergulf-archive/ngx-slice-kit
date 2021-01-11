import { LoadingDirective } from './loading.directive';
import { ComponentFactoryResolver, ViewContainerRef } from "@angular/core";

describe('LoadingDirective', () => {
    it('should create an instance', () => {
        let viewRef: ViewContainerRef
        let resolver: ComponentFactoryResolver
        const directive = new LoadingDirective(
            viewRef,
            resolver
        );
        expect(directive).toBeTruthy();
    });
});
