import { EventEmitter } from '@angular/core';

export class OverlayModel {
    public resultEvent: EventEmitter<any>;
    public options?: OverlayOptions;
}

export class OverlayOptions {
    public index?: number = 100;
    public data?: any = null;
    public component?: any;
    public triggerRect?: ClientRect;
    public fitWidth?: boolean;
    public positionStrategy?: OverlayStickPosition; // undefined, or 'none' which is default
    public sizeStrategy?: OverlaySize; // which is fit screen height/width
    public overlayStrategy?: OverlayStrategy = `overlay`;


    /**
     * hide overlay on backdrop click, default 'true'
     */
    public hideOnBackdrop?: boolean = true;
    public hideOnScroll?;
    public hideOnWindowResize?;

    /**
     * hide overlay on Esc (Enter ?, Space ?) keyup event, default 'true' with result
     */
    public hideOnEscape?: boolean = true;

    /**
     * fill backdrop with shadowed background, default 'true'
     */
    public backdropVisible?: boolean = true;

    /**
     * hide overlay on router change event, default 'true'
     */
    public hideOnRouteChange?: boolean = true;

    /**
     * specify overlay content window border-radius, default '0'
     */
    public borderRadius?: number = 0;

    /**
     * disable overlay content scroll, defaults to 'false'
     */
    public disableScroll?: boolean = false;

    public styles?: any;
}

export type OverlayStickPosition = `center` | `top` | `bottom` | `right` | `left` | `target`;
export type OverlaySize = `screen-width` | `screen-height` | `fullscreen` | `fit-width` | `fit-height` | `fit`;
export type OverlayStrategy = `overlay` | `fixed` | `stick`;

