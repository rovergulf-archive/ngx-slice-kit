import { ThemeDirective } from './theme.directive';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';
import {TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ElementRef, Renderer2} from '@angular/core';

describe('ThemeDirective', () => {
    let layoutControl: LayoutControlService;
    let themeService: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserDynamicTestingModule],
            declarations: [
                TestComponent,
                // ThemeService,
                // layoutControl
            ],
            providers: [
                ThemeDirective,
                Renderer2,
                {provide: ElementRef, useValue: new MockElementRef({})}
            ]
        });
        layoutControl = TestBed.inject(LayoutControlService);
        themeService = TestBed.inject(ThemeService);
    });

    it('should create an instance', () => {
        // let document: Document;
        // let el: ElementRef;
        // let renderer: Renderer2;
        // const directive = new ThemeDirective(
        //     document,
        //     el,
        //     renderer,
        //     themeService,
        //     layoutControl,
        // );
        const directive = TestBed.inject(ThemeDirective);
        expect(directive).toBeTruthy();
    });
});

export class MockElementRef extends ElementRef {
    nativeElement = {};
}

@Component({
    template: `
        <div sdk-theme>
            <p>acca dacca</p>
        </div>>`
})
class TestComponent {
}
