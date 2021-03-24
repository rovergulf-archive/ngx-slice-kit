import { DialogDirective } from './dialog.directive';
import {ElementRef, PLATFORM_ID, ViewContainerRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationScrollDirective} from '../../core/directives/navigation-scroll.directive';

describe('DialogDirective', () => {
    let directive: DialogDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DialogDirective,
                ViewContainerRef,
            ]
        });
        directive = TestBed.inject(DialogDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
