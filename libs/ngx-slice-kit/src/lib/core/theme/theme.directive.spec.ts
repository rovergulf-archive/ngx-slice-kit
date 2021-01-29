import { ThemeDirective } from './theme.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { ThemeService } from './theme.service';
import { LayoutControlService } from '../layout-control/layout-control.service';

describe('ThemeDirective', () => {
  let layoutControl: LayoutControlService;
  let themeService: ThemeService;

  it('should create an instance', () => {
    let document: Document;
    let el: ElementRef;
    let renderer: Renderer2;
    const directive = new ThemeDirective(
      document,
      el,
      renderer,
      themeService,
      layoutControl,
    );
    expect(directive).toBeTruthy();
  });
});
