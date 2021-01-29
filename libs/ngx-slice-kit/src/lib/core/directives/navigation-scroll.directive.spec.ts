import { NavigationScrollDirective } from './navigation-scroll.directive';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

describe('NavigationScrollDirective', () => {
    const UNIX_PLATFORM_ID = 4;
    it('should create an instance', () => {
        let el: ElementRef;
        let router: Router;
        const directive = new NavigationScrollDirective(UNIX_PLATFORM_ID, el, router);
        expect(directive).toBeTruthy();
    });
});
