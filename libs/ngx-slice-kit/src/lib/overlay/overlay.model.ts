import { EventEmitter } from '@angular/core';

export class OverlayModel {
    result: EventEmitter<any>;
    options?: OverlayOptions;
}

export class OverlayOptions {
    index?: number = 100;
    data?: any = null;
    component?: any;
    triggerRect?: ClientRect;
    fitWidth?: boolean;
    positionStrategy?: OverlayStickPosition; // undefined, or 'none' which is default
    sizeStrategy?: OverlaySize; // which is fit screen height/width
    overlayStrategy?: OverlayStrategy = `overlay`;


    /**
     * hide overlay on backdrop click, default 'true'
     */
    hideOnBackdrop?: boolean = true;
    hideOnScroll?;
    hideOnWindowResize?;

    /**
     * hide overlay on Esc (Enter ?, Space ?) keyup event, default 'true' with result
     */
    hideOnEscape?: boolean = true;

    /**
     * fill backdrop with shadowed background, default 'true'
     */
    backdropVisible?: boolean = true;

    /**
     * hide overlay on router change event, default 'true'
     */
    hideOnRouteChange?: boolean = true;

    /**
     * specify overlay content window border-radius, default '0'
     */
    borderRadius?: number = 0;

    /**
     * disable overlay content scroll, defaults to 'false'
     */
    disableScroll?: boolean = false;

    styles?: any;
}

export type OverlayStickPosition = `center` | `top` | `bottom` | `right` | `left` | `target`;
export type OverlaySize = `screen-width` | `screen-height` | `fullscreen` | `fit-width` | `fit-height` | `fit`;
export type OverlayStrategy = `overlay` | `fixed` | `stick`;

