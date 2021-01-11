import { AlertDirective } from './alert.directive';
import { ViewContainerRef } from '@angular/core';

describe('AlertDirective', () => {
    it('should create an instance', () => {
        let containerRef: ViewContainerRef
        const directive = new AlertDirective(containerRef);
        expect(directive).toBeTruthy();
    });
});
