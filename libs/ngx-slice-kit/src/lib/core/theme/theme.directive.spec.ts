import { ThemeDirective } from './theme.directive';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Component, DebugElement, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Theme} from './theme.model';

const rendererMock =  {
    createElement: (): HTMLElement => {
        return document.createElement('style');
    },
    setAttribute: (el, attr, value): any => {
        return el.setAttribute(attr, value);
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
            ],
            providers: [
                ThemeDirective,
                {provide: Renderer2, useValue: rendererMock},
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

    it('should #setTheme do not be called if #theme is undefined', () => {
        spyOn(themeService, 'setTheme');
        spyOn(directive, 'updateTheme');

        directive.ngOnInit();
        expect(themeService.setTheme).not.toHaveBeenCalled();
        expect(directive.updateTheme).toHaveBeenCalled();
    });

    it('should element has .sdk-theme-$name class with name of theme', () => {
        const theme = new Theme({...themeService.themes[0], name: 'olive'});

        directive.updateTheme(theme);
        expect(directive.getElement()).toHaveClass('sdk-theme-olive');
    });

    it('should element has class .sdk-custom-scroll if layout #platform.BLINK is false', () => {
        const theme = new Theme({...themeService.themes[0], name: 'olive'});
        layoutControl.platform.BLINK = false;

        directive.updateTheme(theme);
        expect(directive.getElement()).toHaveClass('sdk-custom-scroll');
    });

    it('should element has no class .sdk-custom-scroll if layout #platform.BLINK is true, and has platform class', () => {
        const theme = new Theme({...themeService.themes[0], name: 'blackolive'});
        layoutControl.platform.BLINK = true;

        directive.updateTheme(theme);
        expect(directive.getElement()).toHaveClass('browser');
        expect(directive.getElement()).not.toHaveClass('sdk-custom-scroll');
    });

    it('should styles has correct attribute by current theme', () => {
        const apricotTheme = new Theme({...themeService.themes[0], name: 'apricot'});
        const mangoTheme = new Theme({...themeService.themes[0], name: 'mango'});

        directive.updateTheme(apricotTheme);
        const apricotStyles = document.head.querySelectorAll('[sdkTheme]')[0];
        expect(apricotStyles.getAttribute('sdkTheme')).toEqual('apricot');

        directive.updateTheme(mangoTheme);
        const mangoStyles = document.head.querySelectorAll('[sdkTheme]')[0];
        expect(mangoStyles.getAttribute('sdkTheme')).toEqual('mango');

        expect(document.head.querySelectorAll('[sdkTheme]').length).toEqual(1);
    });
});

export class MockElementRef extends ElementRef {
    public nativeElement = {};
}

@Component({
    template: `
        <div sdkTheme>
            <p>acca dacca</p>
        </div>>`
})
class TestComponent {}
