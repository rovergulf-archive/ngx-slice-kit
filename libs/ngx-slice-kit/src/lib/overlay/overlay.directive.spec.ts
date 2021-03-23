import { OverlayDirective } from './overlay.directive';
import {ViewContainerRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('OverlayDirective', () => {
    let directive: OverlayDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                OverlayDirective,
                ViewContainerRef
            ]
        });

        directive = TestBed.inject(OverlayDirective);
    });

    it('should create an instance', () => {
        // let containerRef: ViewContainerRef;
        // const directive = new OverlayDirective(containerRef);
        expect(directive).toBeTruthy();
    });
});
