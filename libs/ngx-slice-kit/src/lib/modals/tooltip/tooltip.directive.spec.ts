import { TooltipDirective } from './tooltip.directive';
import { ElementRef, Renderer2 } from "@angular/core";

describe('TooltipDirective', () => {


    it('should create an instance', () => {
        let elementRef: ElementRef;

        let renderer: Renderer2;

        const directive = new TooltipDirective(
            elementRef, renderer
        );

        expect(directive).toBeTruthy();
    });
});
