import { DialogDirective } from './dialog.directive';
import { ViewContainerRef } from '@angular/core';

describe('DialogDirective', () => {
    it('should create an instance', () => {
        var templateRef: ViewContainerRef;
        const directive = new DialogDirective(templateRef);
        expect(directive).toBeTruthy();
    });
});
