import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { GLYPHS } from './icon.glyphs';
import { SafeHtml } from '@angular/platform-browser';
import { Renderer2, Type } from '@angular/core';

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;
    let icon: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IconComponent],
            providers: [Renderer2]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
        icon = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should #icon set default value if user doesnt input value', () => {
        const defaultValue = 'ngx-slice';
        expect(component.icon).toBe(defaultValue);
        component.icon = undefined;
        component.ngOnInit();
        expect(component.icon).toBe(defaultValue);
    });

    it('should be #inline be true by default', () => {
        expect(component.inline).toBe(true);
    });

    it('should be #size equal default value', () => {
        const defaultSize = 24;
        expect(component.size).toBe(defaultSize);
    });

    it('should be #color equal default value', () => {
        const defaultColor = 'var(--regular-text)';
        expect(component.color).toBe(defaultColor);
    });

    it('should #size changes by get method', () => {
        const newSize = 48;
        component.size = newSize;

        fixture.detectChanges();
        expect(component.size).toBe(newSize);
    });

    it('should #color changes by get method', () => {
        const newColor = 'red';
        component.color = newColor;

        fixture.detectChanges();
        expect(component.color).toBe(newColor);
    });

    it('should #prepareSymbol() return svg element from GLYPHS by default', () => {
        const defaultIcon = 'ngx-slice';
        const symbol = GLYPHS[defaultIcon];
        expect(symbol).toEqual(component.prepareSymbol(defaultIcon, ''));
    });

    it('should #prepareSymbol() return svg element from GLYPHS with different color by #color argument', () => {
        const defaultIcon = 'ngx-slice';
        const color = 'red';
        const symbol = GLYPHS[defaultIcon].replace(`fill="var(--regular-text)"`, `fill="${color}"`);
        expect(symbol).toEqual(component.prepareSymbol(defaultIcon, color));
    });

    it('should #prepareSymbol() return svg element from GLYPHS with different size by #size property of component', () => {
        const defaultIcon = 'ngx-slice';
        const size = 48;
        let symbol = GLYPHS[defaultIcon];
        symbol = symbol.replace(`height="24px"`, `height="${size}px"`);
        symbol = symbol.replace(`width="24px"`, `width="${size}px"`);

        component.size = size;
        expect(symbol).toEqual(component.prepareSymbol(defaultIcon, ''));
    });

    it('should #renderComponentSvg() change svg property of component', () => {
        const newSize = 48;
        const newColor = 'red';
        const defaultSize = 24;
        const initSvg = component.svg;

        expect(component.size).toBe(defaultSize);

        component.size = newSize;
        fixture.detectChanges();
        const newSvg = component.svg;
        expect(component.size).toBe(newSize);
        expect(initSvg).not.toBe(newSvg);

        component.color = newColor;
        const superNewSvg = component.svg;
        expect(component.color).toBe(newColor);
        expect(newSvg).not.toBe(superNewSvg);
    });

    it('should #svg be set as #SafeHtml by symbol string', () => {
        const svg: SafeHtml = component.svg;
        expect(svg).toBeTruthy();
    });

    it('should svg element have attributes(height/width/fill) as user set', () => {
        const newSize = 48;
        const newColor = '#123456';
        const newIcon = 'add';
        component.size = newSize;
        fixture.detectChanges();

        const symbol = component.prepareSymbol(newIcon, newColor);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = symbol;
        const mySvg = wrapper.firstElementChild;
        const svgHeight = mySvg.getAttribute('height');
        const svgWidth = mySvg.getAttribute('width');
        const svgFill = mySvg.querySelector('[fill="#123456"]').getAttribute('fill');

        expect(svgHeight).toBe(`${newSize}px`, 'should svg have height as it set');
        expect(svgWidth).toBe(`${newSize}px`, 'should svg have width as it set');
        expect(newColor).toBe(svgFill, 'should svg have color as it set');
    });

    it('should #setIconColor(color) call renderer to set color attribute for svg', () => {
        const newColor = '#123456';
        const symbol = fixture.elementRef.nativeElement.querySelector(`[class="icon"]`);
        const renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
        component.icon = 'add';

        spyOn(renderer2, 'setAttribute');
        component.setIconColor(newColor);
        expect(renderer2.setAttribute).toHaveBeenCalledWith(symbol, 'fill', newColor);
    });

    it('should #createIcon(symbol) call renderer to create svg element', () => {
        const renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
        const symbol = component.prepareSymbol('add');

        spyOn(renderer2, 'createElement');
        component.createIcon(symbol);
        expect(renderer2.createElement).toHaveBeenCalledWith('svg', symbol);
    });
});
