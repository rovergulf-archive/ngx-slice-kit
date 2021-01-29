import { OverlayDirective } from './overlay.directive';
import { ViewContainerRef } from '@angular/core';

describe('OverlayDirective', () => {
    it('should create an instance', () => {
        let containerRef: ViewContainerRef;
        const directive = new OverlayDirective(containerRef);
        expect(directive).toBeTruthy();
    });
});
