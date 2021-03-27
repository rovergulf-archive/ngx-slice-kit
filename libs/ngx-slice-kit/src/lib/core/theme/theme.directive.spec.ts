import { ThemeDirective } from './theme.directive';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Component, DebugElement, ElementRef, OnInit, Renderer2} from '@angular/core';

const renderer2Mock = jasmine.createSpyObj('renderer2Mock', [
    'destroy',
    'createElement',
    'createComment',
    'createText',
    'destroyNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'selectRootElement',
    'parentNode',
    'nextSibling',
    'setAttribute',
    'removeAttribute',
    'addClass',
    'removeClass',
    'setStyle',
    'removeStyle',
    'setProperty',
    'setValue',
    'listen'
]);

const rootRendererMock =  {
    createElement: () => {
        return renderer2Mock;
    }
};

describe('ThemeDirective', () => {
    let layoutControl: LayoutControlService;
    let themeService: ThemeService;
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let themeDe: DebugElement;
    let themeEl: HTMLElement;
    let directive: ThemeDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserDynamicTestingModule],
            declarations: [
                TestComponent,
                ThemeDirective,
                // ThemeService,
                // layoutControl
            ],
            providers: [
                ThemeDirective,
                // Renderer2,
                {provide: Renderer2, useValue: rootRendererMock},
                {provide: ElementRef, useValue: new MockElementRef({})}
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        themeDe = fixture.debugElement;
        themeEl = themeDe.nativeElement;
        layoutControl = TestBed.inject(LayoutControlService);
        themeService = TestBed.inject(ThemeService);
        directive = TestBed.inject(ThemeDirective);
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

        expect(directive).toBeTruthy();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should #scoped be false by default', () => {
        expect(directive.scoped).toBeFalse();
    });

    it('should #scoped set correct value from input', () => {
        directive.scoped = true;
        expect(directive.scoped).toBeTrue();
    });

    it('should #getElement return body element if #scoped is false', () => {
        directive.scoped = false;
        expect(directive.getElement().tagName).toEqual('BODY');
    });

    it('should #getElement return directive elementRef if #scoped is true', () => {
        directive.scoped = true;
        expect(directive.getElement()).toEqual({});
    });

    it('should #theme be undefined by default', () => {
        expect(directive.theme).toBeUndefined();
    });

    it('should #theme has correct value from input if it was set', () => {
        directive.theme = 'pinkblue';
        expect(directive.theme).toEqual('pinkblue');
    });

    it('should be called #themeService.setTheme if #theme has value after init', () => {
        const t = 'blue';
        directive.theme = t;
        spyOn(themeService, 'setTheme');

        directive.ngOnInit();
        expect(themeService.setTheme).toHaveBeenCalledWith(t);
    });

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

    // it('should', () => {});

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
class TestComponent implements OnInit {

    ngOnInit(): void {
    }
}
