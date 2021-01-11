import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sdkOverlay]'
})
export class OverlayDirective {

  constructor(
      public viewContainerRef: ViewContainerRef
  ) { }

}
